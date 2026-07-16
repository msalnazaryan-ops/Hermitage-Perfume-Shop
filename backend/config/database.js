import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config(); // Սա կարդում է .env ֆայլը

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Եթե գաղտնաբառ չունես, այստեղ կլինի դատարկ
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('❌ MySQL միացման սխալ:', err.message);
    } else {
        console.log('✅ MySQL բազան հաջողությամբ միացավ');
    }
});

export default db;