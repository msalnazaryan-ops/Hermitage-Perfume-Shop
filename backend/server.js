import app from './app.js'; // Անպայման .js-ով
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Սերվերը պատրաստ է: Մտիր այս հասցեով՝ http://localhost:${PORT}`);
});