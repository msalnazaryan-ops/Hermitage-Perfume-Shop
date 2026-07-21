// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// const app = express();
// const PORT = 3000;
//
// import express from 'express';
// import path from 'path';
// import { fileURLToPath } from 'url';
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// const app = express();
// const PORT = 3000;
//
// app.use(express.json());
//
// // --- ԱՅՍՏԵՂ ԴԻՐ ԱՅԴ ՏՈՂԸ ---
// // Սա սերվերին ասում է, որ 'frontend' թղթապանակի պարունակությունը դարձնի հասանելի
// // Եթե քո ֆայլերը 'frontend' թղթապանակի մեջ են
// app.use(express.static(path.join(__dirname, 'frontend')));
//
// // Հետո գալիս են քո API երթուղիները
// app.get('/api/get-perfume-details', (req, res) => {
//     // ... քո տրամաբանությունը
// });
//
// app.listen(PORT, () => {
//     console.log(`🚀 Սերվերը աշխատում է http://localhost:${PORT}`);
// });
//
//
// // import app from './app.js';
// // import dotenv from 'dotenv';
// //
// // dotenv.config();
// //
// // const PORT = process.env.PORT || 3000;
// //
// // // API երթուղիներ
// // app.get('/api/get-perfume-details', (req, res) => {
// //     const perfumeName = req.query.name;
// //     console.log("Սերվերը ստացավ հարցում՝", perfumeName);
// //
// //     // Ժամանակավոր JSON պատասխան
// //     res.json({
// //         "image": "../assets/images/212vip.jpg",
// //         "price": "26400",
// //         "gender": "Female",
// //         "notes": ["Նոտա 1: Բեռգամոտ", "Նոտա 2: Ռոմ", "Նոտա 3: Մուշկ"]
// //     });
// // });
// //
// // // Սերվերը միացնում ենք ՄԻԱՅՆ ՄԵԿ ԱՆԳԱՄ
// // app.listen(PORT, () => {
// //     console.log(`🚀 Սերվերը պատրաստ է: Մտիր այս հասցեով՝ http://localhost:${PORT}`);
// // });