import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import authRoutes from './routes/auth.js';

const app = express();
const frontendPath = path.join(process.cwd(), 'frontend');

app.use(cors());
app.use(express.json());
app.use(express.static(frontendPath)); // Սա բավական է static ֆայլերի համար

app.use('/api/auth', authRoutes);

// Այստեղից ջնջիր /api/get-perfume-details-ի ողջ տրամաբանությունը

// SPA-ի համար (index.html)
app.get('*', (req, res) => {
    const filePath = path.join(frontendPath, req.path);
    if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
        res.sendFile(filePath);
    } else {
        res.sendFile(path.join(frontendPath, 'index.html'));
    }
});

export default app;


// import express from 'express';
// import cors from 'cors';
// import path from 'path';
// import fs from 'fs';
// import authRoutes from './routes/auth.js';
//
// const app = express();
//
// app.use(cors());
// app.use(express.json());
//
// app.use('/api/auth', authRoutes);
//
// const frontendPath = path.join(process.cwd(), 'frontend');
// app.use(express.static(frontendPath));
//
// /* ===========================================
//    API - Product Details
// =========================================== */
// app.get('/api/get-perfume-details', (req, res) => {
//     const perfumeName = req.query.name;
//
//     console.log("Սերվերը ստացավ հարցում՝", perfumeName);
//
//     res.json({
//         image: "/assets/images/212vip.jpg",
//         price: "26400",
//         gender: "Female",
//         notes: [
//             "Bergamot",
//             "Rum",
//             "Musk"
//         ]
//     });
// });
//
// /* ===========================================
//    Frontend Pages
// =========================================== */
// app.get('*', (req, res) => {
//
//     const filePath = path.join(frontendPath, req.path);
//
//     if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
//         res.sendFile(filePath);
//     } else {
//         res.sendFile(path.join(frontendPath, 'index.html'));
//     }
//
// });
//
// export default app;
//
//
// // import express from 'express';
// // import cors from 'cors';
// // import path from 'path';
// // import fs from 'fs'; // 1. Ավելացրու այս տողը վերևում
// // import authRoutes from './routes/auth.js';
// //
// // const app = express();
// //
// // app.use(cors());
// // app.use(express.json());
// //
// // app.use('/api/auth', authRoutes);
// //
// // const frontendPath = path.join(process.cwd(), 'frontend');
// // app.use(express.static(frontendPath));
// //
// // // 2. Փոխարինիր հին app.get('*', ...)-ը սրանով
// // app.get('*', (req, res) => {
// //     // Կառուցում ենք հարցվող ֆայլի ուղին
// //     const filePath = path.join(frontendPath, req.path);
// //
// //     // Եթե ֆայլը գոյություն ունի (օրինակ՝ makeup.html), ուղարկում ենք այն
// //     if (fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) {
// //         res.sendFile(filePath);
// //     } else {
// //         // Եթե ֆայլը չկա, ուղարկում ենք index.html (SPA-ի համար)
// //         res.sendFile(path.join(frontendPath, 'index.html'));
// //     }
// // });
// //
// // export default app;
// //
