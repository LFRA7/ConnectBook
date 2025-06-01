import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erro ao ligar ao MongoDB:'));
db.once('open', () => {
    console.log('Ligação ao MongoDB (local) estabelecida com sucesso!');
});

export default mongoose;