import app from './app.js';
import dotenv from 'dotenv';
import { perfumeDatabase } from './perfumes.js'; // Ներմուծում ենք տվյալները

dotenv.config();
const PORT = process.env.PORT || 3000;
app.get("/api/get-perfume-details", (req, res) => {
    console.log("Ստացված հարցում query.name:", req.query.name); // Սա կտպի տերմինալում

    const rawName = req.query.name || "";
    const queryName = rawName.trim().toLowerCase();

    if (!queryName) {
        return res.status(400).json({ error: "Name parameter is required" });
    }

    const foundKey = Object.keys(perfumeDatabase).find(key => {
        const cleanKey = key.trim().toLowerCase();
        return cleanKey === queryName || cleanKey.replace(/\s+/g, '') === queryName.replace(/\s+/g, '');
    });

    let perfume = foundKey ? perfumeDatabase[foundKey] : null;

    if (!perfume) {
        perfume = Object.values(perfumeDatabase).find(p => {
            const dbName = (p.name || "").trim().toLowerCase();
            const dbBrand = (p.brand || "").trim().toLowerCase();
            return dbName === queryName || dbBrand === queryName ||
                dbName.replace(/\s+/g, '') === queryName.replace(/\s+/g, '');
        });
    }

    if (!perfume) {
        console.log("Բազայում չգտնվեց ապրանքը հետևյալ անունով:", queryName);
        return res.status(404).json({ error: "Perfume not found" });
    }

    res.json(perfume);
});
// app.get("/api/get-perfume-details", (req, res) => {
//     const queryName = req.query.name ? req.query.name.trim().toLowerCase() : "";
//
//     if (!queryName) {
//         return res.status(400).json({ error: "Name parameter is required" });
//     }
//
//     // 1. Նախ փնտրում ենք օբյեկտի բանալիների մեջ (անտեսելով մեծատառ/փոքրատառը)
//     let foundKey = Object.keys(perfumeDatabase).find(
//         key => key.trim().toLowerCase() === queryName
//     );
//
//     let perfume = foundKey ? perfumeDatabase[foundKey] : null;
//
//     // 2. Եթե բանալիով չգտավ, փնտրում ենք արդեն օբյեկտների ներսի name կամ brand դաշտերով
//     if (!perfume) {
//         perfume = Object.values(perfumeDatabase).find(p =>
//             (p.name && p.name.trim().toLowerCase() === queryName) ||
//             (p.brand && p.brand.trim().toLowerCase() === queryName)
//         );
//     }
//
//     if (!perfume) {
//         return res.status(404).json({ error: "Perfume not found" });
//     }
//
//     res.json(perfume);
// });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// import app from './app.js';
// import dotenv from 'dotenv';
// import { perfumeDatabase } from './perfumes.js'; // Ներմուծում ենք տվյալները
//
// dotenv.config();
// const PORT = process.env.PORT || 3000;
//
// app.get("/api/get-perfume-details", (req, res) => {
//     const perfumeName = req.query.name;
//     const perfume = perfumeDatabase[perfumeName];
//
//     if (!perfume) {
//         return res.status(404).json({ error: "Perfume not found" });
//     }
//     res.json(perfume);
// });
//
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });