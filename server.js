import app from './app.js'; // ⚠️ ԿԱՐԵՎՈՐ: Տեղական ֆայլի դեպքում .js ընդլայնումը պարտադիր է
import dotenv from 'dotenv';

dotenv.config(); // Կարդում ենք .env ֆայլի տվյալները

// Վերցնում ենք պորտը .env-ից, եթե չկա՝ դնում ենք 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Սերվերը պատրաստ է: Մտիր այս հասցեով՝ http://localhost:${PORT}`);
});