import db from '../config/database.js'; // ⚠️ Անպայման .js ընդլայնումով
import bcrypt from 'bcryptjs'; // 🔥 Ներմուծում ենք կոդավորման գրադարանը

// ✅ SIGN UP (Գրանցում՝ Գաղտնաբառի հեշավորմամբ)
export const signup = async (req, res) => {
    const { first_name, email, password } = req.body;

    // Ստուգում ենք՝ արդյոք տվյալները հասել են Backend
    if (!first_name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Բոլոր դաշտերը պարտադիր են:' });
    }

    try {
        // 1. Ստուգում ենք՝ արդյոք այս email-ով օգտատեր արդեն կա
        const checkSql = 'SELECT * FROM users WHERE email = ?';
        db.query(checkSql, [email], async (err, results) => {
            if (err) return res.status(500).json({ success: false, message: 'Բազայի սխալ:' });

            if (results.length > 0) {
                return res.status(400).json({ success: false, message: 'Այս էլ. հասցեն արդեն գրանցված է:' });
            }

            // 2. 🔥 ԿՈԴԱՎՈՐՈՒՄ ԵՆՔ ԳԱՂՏՆԱԲԱՌԸ (Hashing)
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // 3. Բազայի մեջ գրում ենք կոդավորված գաղտնաբառը (hashedPassword)
            const sql = 'INSERT INTO users (first_name, email, password) VALUES (?, ?, ?)';
            db.query(sql, [first_name, email, hashedPassword], (err, result) => {
                if (err) {
                    console.error('❌ Բազայում գրանցման սխալ:', err.message);
                    return res.status(500).json({ success: false, message: 'Տվյալների բազայի սխալ:' });
                }

                console.log(`✅ Օգտատեր ${first_name}-ը հաջողությամբ գրանցվեց (Գաղտնաբառը պաշտպանված է):`);
                return res.status(201).json({ success: true, message: 'Գրանցումը հաջողվեց:' });
            });
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Սերվերի սխալ:' });
    }
};

// ✅ LOG IN (Մուտք՝ Կոդավորված գաղտնաբառի ստուգմամբ)
export const login = (req, res) => {
    const { email, password } = req.body;

    // Փնտրում ենք օգտատիրոջը բազայում միայն ըստ email-ի
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ success: false, message: 'Սերվերի սխալ:' });

        if (results.length === 0) {
            return res.status(401).json({ success: false, message: 'Սխալ էլ. հասցե կամ գաղտնաբառ:' });
        }

        const user = results[0];

        // 🔥 Համեմատում ենք մուտքագրված գաղտնաբառը բազայի հեշի (hash) հետ
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Սխալ էլ. հասցե կամ գաղտնաբառ:' });
        }

        // Եթե համընկավ, մուտքը հաջողվում է
        return res.status(200).json({
            success: true,
            message: 'Մուտքը հաջողվեց:',
            user: { id: user.id, first_name: user.first_name, email: user.email }
        });
    });
};