import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cron from 'node-cron';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './Models/User.js';
import './db.js';

const app = express();
const port = 3000;
const SECRET_KEY = 'tfvygbuhnijmokgvbhn';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/stickers')
    },
    filename: function (req, file, cb) {
        // Use the username as the filename
        const username = req.body.name;
        // Ensure the file is saved as PNG
        cb(null, `${username}.png`);
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Accept only image files
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
});

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/stickers', express.static('public/stickers'));

// GET endpoint to retrieve all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// POST endpoint to add a new user
app.post('/users', upload.single('sticker'), async (req, res) => {
    const { name, email, password, confirmPassword, department, team } = req.body;
    const sticker = req.file ? `${name}.png` : req.body.sticker;

    if (!name || !email || !password || !confirmPassword || !department || !team || !sticker) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (name.length > 10) {
        return res.status(400).json({ error: 'O nome de utilizador deve ter no máximo 10 caracteres.' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'As senhas não coincidem.' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'A password deve ter no mínimo 6 caracteres.' });
    }

    try {
        // Check if email already exists
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ error: 'Email já está em uso.' });
        }

        // Check if username already exists
        const usernameExists = await User.findOne({ name });
        if (usernameExists) {
            return res.status(400).json({ error: 'Nome de usuário já está em uso.' });
        }

        // Random rarity based on weighted probability
        function getRandomRarity() {
            const rand = Math.random();
            if (rand < 0.50) return 'common';       // 50%
            else if (rand < 0.75) return 'rare';    // 25%
            else if (rand < 0.93) return 'epic';    // 18%
            else return 'legendary';                // 7%
        }

        const rarity = getRandomRarity();

        // Create new user
        const user = new User({
            name,
            email,
            password,
            confirmPassword,
            department,
            team,
            sticker,
            rarity,
            credits: 100
        });

        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
});

// POST endpoint to handle login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Por favor, forneça email e senha.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Credenciais inválidas.' });
        }

        // Gerar Token JWT
        const token = jwt.sign({ email: user.email, name: user.name }, SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
});

// Middleware para verificar token
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(403).json({ error: "Acesso negado" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Token inválido ou expirado" });

        req.user = user;
        next();
    });
};

// Rota protegida: /shop
app.get('/shop', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ error: 'Colaborador não encontrado' });
        }

        res.json({
            message: `Hello, ${user.name}`,
            credits: user.credits,
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados da loja' });
    }
});

// Função para obter uma lista de stickers disponíveis
const getAvailableStickers = async () => {
    const users = await User.find({});
    return users.map(user => ({
        name: user.name,
        sticker: user.sticker,
        rarity: user.rarity
    }));
};

// POST endpoint para processar a compra de um pack e atribuir stickers
app.post('/buy-pack', authenticateToken, async (req, res) => {
    const { packPrice, stickerCount } = req.body;

    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(404).json({ error: 'Colaborador não encontrado' });
        }

        if (user.credits < packPrice) {
            return res.status(400).json({ error: 'Créditos insuficientes para esta compra.' });
        }

        user.credits -= packPrice;

        const availableStickers = await getAvailableStickers();
        if (availableStickers.length === 0) {
            return res.status(500).json({ error: "Nenhum sticker disponível para compra." });
        }

        let newStickers = [];
        let repeatedStickers = [];
        let extraCredits = 0;

        availableStickers
            .sort(() => Math.random() - 0.5)
            .slice(0, stickerCount)
            .forEach(sticker => {
                const alreadyHasSticker = user.stickers?.some(s => s.name === sticker.name);

                if (alreadyHasSticker) {
                    repeatedStickers.push({
                        name: sticker.name,
                        sticker: sticker.sticker,
                        rarity: sticker.rarity
                    });
                    // Calcular créditos extras com base na raridade
                    switch (sticker.rarity) {
                        case 'common':
                            extraCredits += 5;
                            break;
                        case 'rare':
                            extraCredits += 10;
                            break;
                        case 'epic':
                            extraCredits += 15;
                            break;
                        case 'legendary':
                            extraCredits += 20;
                            break;
                    }
                } else {
                    newStickers.push({
                        name: sticker.name,
                        sticker: sticker.sticker,
                        rarity: sticker.rarity
                    });
                }
            });

        if (!user.stickers) {
            user.stickers = [];
        }
        user.stickers.push(...newStickers.map(s => ({
            name: s.name,
            sticker: s.sticker
        })));

        user.credits += extraCredits;

        await user.save();

        res.json({
            message: `Compra realizada! Créditos restantes: ${user.credits}`,
            credits: user.credits,
            newStickers,
            repeatedStickers,
            extraCredits
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar compra' });
    }
});

// Rota protegida: /profile
app.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ error: 'Colaborador não encontrado' });
        }

        // Mapear os stickers para incluir a raridade correta
        const stickersWithRarity = await Promise.all((user.stickers || []).map(async sticker => {
            const originalUser = await User.findOne({ name: sticker.name });
            return {
                ...sticker.toObject(),
                rarity: originalUser ? originalUser.rarity : 'common'
            };
        }));

        res.json({ 
            name: user.name,
            credits: user.credits,
            stickers: stickersWithRarity
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar perfil' });
    }
});

// Distribuir créditos todos os dias de 24 em 24 horas
cron.schedule('0 0 * * *', async () => {
    try {
        console.log('Distributing credits to all users...');
        await User.updateMany({}, { $inc: { credits: 100 } });
        console.log('Credits distributed successfully!');
    } catch (error) {
        console.error('Error distributing credits:', error);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});