import express from 'express';
import cors from 'cors';
import path from 'path';
import authRoutes from './routes/auth.js'; // ⚠️ ԿԱՐԵՎՈՐ: Տեղական ֆայլերի դեպքում .js ընդլայնումը պարտադիր է

const app = express();

app.use(cors());
app.use(express.json());

// Միացնում ենք մեր ստեղծած auth route-ը
app.use('/api/auth', authRoutes);

// ✅ Հասցեն վերցնում ենք պրոեկտի արմատային թղթապանակից (process.cwd())
const frontendPath = path.join(process.cwd(), 'frontend');
app.use(express.static(frontendPath));

// ✅ Գլխավոր էջի և բոլոր այլ էջերի հարցումները ուղարկում ենք ճիշտ index.html-ին
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// ✅ Ժամանակակից export՝ module.exports-ի փոխարեն
export default app;