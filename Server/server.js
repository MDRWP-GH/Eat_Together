const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const { readdirSync } = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const authRouter = require('./routes/auth');
const CategoryRouter = require('./routes/category');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eat_together'
});

db.connect(err => {
    if (err) throw err;
    console.log('📡 MySQL Connected...');
});

// 📌 API เพิ่มผู้ใช้ลงคิว และจับคู่
app.post('/match', (req, res) => {
    const { user_id, restaurant_id } = req.body;

    // ตรวจสอบว่าผู้ใช้รออยู่หรือไม่
    db.query(
        "SELECT * FROM user_queue WHERE user_id = ? AND restaurant_id = ? AND status = 'waiting'",
        [user_id, restaurant_id],
        (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                // 📌 ถ้ายังไม่มี ให้เพิ่มลงในคิว
                db.query("INSERT INTO user_queue (user_id, restaurant_id) VALUES (?, ?)",
                    [user_id, restaurant_id], (err, result) => {
                        if (err) throw err;
                    }
                );
            }

            // 📌 ตรวจสอบว่ามีคนรอจับคู่ในร้านเดียวกันหรือไม่
            db.query(
                "SELECT * FROM user_queue WHERE restaurant_id = ? AND status = 'waiting' ORDER BY timestamp ASC LIMIT 2",
                [restaurant_id], (err, users) => {
                    if (err) throw err;

                    if (users.length === 2) {
                        const user1 = users[0].user_id;
                        const user2 = users[1].user_id;

                        // 📌 อัปเดตสถานะเป็น matched
                        db.query("UPDATE user_queue SET status = 'matched', matched_with = ? WHERE user_id = ?", [user2, user1]);
                        db.query("UPDATE user_queue SET status = 'matched', matched_with = ? WHERE user_id = ?", [user1, user2]);

                        return res.json({ status: "matched", user1, user2 });
                    } else {
                        return res.json({ status: "waiting" });
                    }
                }
            );
        }
    );
});

// เปิดให้บริการไฟล์ในโฟลเดอร์ public/uploads (ใช้สำหรับรูปภาพ)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Routes
app.use('/auth', authRouter);
app.use('/category', CategoryRouter);

// Register routes from routes directory
readdirSync(path.join(__dirname, 'routes'))
.map((c) => app.use('/api', require(`./routes/${c}`)));

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../Frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/Home.html"));
});



// Start the server
app.listen(5000, () => console.log('Server is running on http://localhost:5000/'));
