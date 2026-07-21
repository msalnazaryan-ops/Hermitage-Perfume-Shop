import app from './app.js';
import dotenv from 'dotenv';
import { perfumeDatabase } from './perfumes.js'; // Ներմուծում ենք տվյալները

dotenv.config();
const PORT = process.env.PORT || 3000;

app.get("/api/get-perfume-details", (req, res) => {
    const perfumeName = req.query.name;
    const perfume = perfumeDatabase[perfumeName];

    if (!perfume) {
        return res.status(404).json({ error: "Perfume not found" });
    }
    res.json(perfume);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});