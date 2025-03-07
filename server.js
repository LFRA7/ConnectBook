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

// GET endpoint to retrieve all pets
app.get('/users', (req, res) => {
    res.json(db.data.users);
});

// POST endpoint to add a new pet
app.post('/users', async (req, res) => {
    const user = req.body;
    db.data.users.push(user);
    await db.write();
    res.status(201).json(user);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});