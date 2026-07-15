import mysql from 'mysql2';

// ՈՒՂՂՎԱԾ Է․ Տվյալները գրված են ուղղակիորեն, որպեսզի կապը 100%-ով աշխատի
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3000',
    database: 'hermitage_db'
});

db.connect((err) => {
    if (err) {
        console.error('❌ MySQL միացման սխալ:', err.message);
    } else {
        console.log('✅ MySQL բազան հաջողությամբ միացավ (hermitage_db)');
    }
});

// ✅ Ժամանակակից export՝ module.exports = db;-ի փոխարեն
export default db;