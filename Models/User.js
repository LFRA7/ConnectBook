import mongoose from 'mongoose';

const stickerSchema = new mongoose.Schema({
    name: String,
    sticker: String
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    confirmPassword: String,
    department: String,
    team: String,
    sticker: String,
    rarity: String,
    credits: { type: Number, default: 100 },
    stickers: [stickerSchema]
});

const User = mongoose.model('User', userSchema);
export default User;