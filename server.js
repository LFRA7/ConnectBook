import express from 'express';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node';
import jwt from 'jsonwebtoken';

const app = express();
const defaultData = { users: [] }
const port = 3000;
const SECRET_KEY = 'tfvygbuhnijmokgvbhn';

// Set up lowdb with a JSON file adapter
const db = await JSONFilePreset('db.json', defaultData);

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.use('/stickers', express.static('public/stickers'));

// GET endpoint to retrieve all users
app.get('/users', (req, res) => {
    res.json(db.data.users);
});

// POST endpoint to add a new user
app.post('/users', async (req, res) => {
    const { name, email, password, confirmPassword, department, team, sticker} = req.body;

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

    // Check if email already exists
    const emailExists = db.data.users.some(user => user.email === email);
    if (emailExists) {
        return res.status(400).json({ error: 'Email já está em uso.' });
    }

    // Check if email or username already exists
    const usernameExists = db.data.users.some(user => user.name === name);
    if (usernameExists) {
        return res.status(400).json({ error: 'Nome de usuário já está em uso.' });
    }

    // Add the new user to the database
    const user = { name, email, password, confirmPassword, department, team, sticker, credits: 100 };
    db.data.users.push(user);
    await db.write();
    res.status(201).json(user);
});

// POST endpoint to handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Por favor, forneça email e senha.' });
    }

    const user = db.data.users.find(user => user.email === email);
    if (!user || user.password !== password) {
        return res.status(400).json({ error: 'Credenciais inválidas.' });
    }

    // Gerar Token JWT
    const token = jwt.sign({ email: user.email, name: user.name }, SECRET_KEY, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido', token });
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
app.get('/shop', authenticateToken, (req, res) => {
    const user = db.data.users.find(u => u.email === req.user.email);

    if (!user) {
        return res.status(404).json({ error: 'Colaborador não encontrado' });
    }

    res.json({
        message: `Hello, ${user.name}`,
        credits: user.credits,
    });
});

// Função para obter uma lista de stickers disponíveis
const getAvailableStickers = (currentUserEmail) => {

    // Filtrar Usuários, exceto o próprio utilizador
    return db.data.users
        .filter(user => user.email !== currentUserEmail) // Exclui o próprio usuário
        .map(user => ({
            name: user.name,
            sticker: user.sticker // Usa o sticker do usuário
        }));
};

// POST endpoint para processar a compra de um pack e atribuir stickers
app.post('/buy-pack', authenticateToken, async (req, res) => {
    const { packPrice, stickerCount } = req.body; // Preço e quantidade de stickers no pack

    const user = db.data.users.find(u => u.email === req.user.email);
    if (!user) {
        return res.status(404).json({ error: 'Colaborador não encontrado' });
    }

    if (user.credits < packPrice) {
        return res.status(400).json({ error: 'Créditos insuficientes para esta compra.' });
    }

    // Deduzir créditos
    user.credits -= packPrice;

    // Obter stickers disponíveis e escolher aleatoriamente
    const availableStickers = getAvailableStickers(user.email);
    if (availableStickers.length === 0) {
        return res.status(500).json({ error: "Nenhum sticker disponível para compra." });
    }

    // Sorteia os stickers aleatórios
    let newStickers = [];
    let extraCredits = 0;

    availableStickers
        .sort(() => Math.random() - 0.5) // Embaralha
        .slice(0, stickerCount) // Seleciona a quantidade pedida
        .forEach(sticker => {
            // Verifica se o utilizador já tem o sticker pelo nome
            const alreadyHasSticker = user.stickers?.some(s => s.name === sticker.name);
            
            if (alreadyHasSticker) {
                extraCredits += 25; // Se já tiver, ganha 25 créditos
            } else {
                newStickers.push(sticker); // Se não tiver, adiciona ao inventário
            }
        });

    // Adiciona os novos stickers ao perfil do usuário
    if (!user.stickers) {
        user.stickers = [];
    }
    user.stickers.push(...newStickers);

    // Adiciona os créditos pelos stickers duplicados
    user.credits += extraCredits;

    await db.write();

    res.json({ 
        message: `Compra realizada! Créditos restantes: ${user.credits}`, 
        credits: user.credits, 
        stickers: newStickers, 
        extraCredits: extraCredits
    });
});


// Rota protegida: /departments
app.get('/departments', authenticateToken, (req, res) => {
    res.json({ departments: departments });

    res.json({
        credits: user.credits,
    })
});


// Rota protegida: /profile
app.get('/profile', authenticateToken, (req, res) => {
    const user = db.data.users.find(u => u.email === req.user.email);

    if (!user) {
        return res.status(404).json({ error: 'Colaborador não encontrado' });
    }

    res.json({ 
        name: user.name,
        credits: user.credits,
        stickers: user.stickers || [] // Evita erro caso o usuário não tenha stickers
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});