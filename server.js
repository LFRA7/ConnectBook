import express from 'express';
import cors from 'cors';
import { JSONFilePreset } from 'lowdb/node';

const app = express();
const defaultData = { users: [] }
const port = 3000;

// Set up lowdb with a JSON file adapter
const db = await JSONFilePreset('db.json', defaultData);

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// GET endpoint to retrieve all users
app.get('/users', (req, res) => {
    res.json(db.data.users);
});

// POST endpoint to add a new user
app.post('/users', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'As senhas não coincidem.' });
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
    const user = { name, email, password, confirmPassword };
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

    // Find user by email
    const user = db.data.users.find(user => user.email === email);

    if (!user) {
        return res.status(400).json({ error: 'Email não encontrado.' });
    }

    // Check if password matches
    if (user.password !== password) {
        return res.status(400).json({ error: 'Senha incorreta.' });
    }

    // Login successful
    res.status(200).json({ message: 'Login bem-sucedido' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});