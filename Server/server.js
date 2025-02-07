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

// เชื่อมต่อกับฐานข้อมูล MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'eatback'
  });
  
  db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err);
        return;
    }
    console.log('✅ Connected to MySQL database!');
  });
  
  // ใช้ body-parser จาก express ที่รวมอยู่แล้ว
  app.use(express.urlencoded({ extended: true })); // ใช้ express แทน body-parser
  app.use(express.json()); // ใช้ express สำหรับการรับข้อมูล JSON
  
  // หน้า login
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'cookie', 'public', 'login.html'));
  });
  
  // Route สำหรับหน้า login
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
  
        if (results.length > 0) {
            // ถ้าผู้ใช้ล็อกอินสำเร็จ
            res.redirect('/home'); // เปลี่ยนเป็น /index
        } else {
            // ถ้าผู้ใช้ล็อกอินไม่สำเร็จ
            res.status(401).json({ message: '❌ Invalid username or password' });
        }
    });
  });
  
  // หน้า signup
  app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'cookie', 'public', 'signup.html'));
  });
  // Route สำหรับการสมัครสมาชิก
  app.post('/signup', (req, res) => {
    const { username, password } = req.body;
  
    // ตรวจสอบหาก username หรือ password ว่าง
    if (!username || !password) {
      return res.status(400).json({ message: '❌ Please provide both username and password' });
    }
  
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      res.redirect('/login'); // เมื่อสมัครเสร็จแล้ว ให้ redirect ไปที่หน้า login
    });
  });
  
  // หน้า login
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd', 'Login.html'));
  });
  
  // หน้า index
  app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd', 'Home.html'));
  });
  
  // ใช้ static files (HTML, CSS, JS)
  app.use(express.static(path.join(__dirname, 'FrontEnd')));
  
  // ตั้งค่าการเชื่อมโยงกับหน้าอื่นๆ
  app.get('/Profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd', 'Profile.html'));
  });
  
  app.get('/Promotions', (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd', 'Promotions.html'));
  });
  
  app.get('/Review', (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd', 'Review.html'));
  });
  
  app.get('/Terms', (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd', 'Terms.html'));
  });

  app.get('/Help', (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd', 'Help.html'));
  });
  
  app.get('/Match', (req, res) => {
    res.sendFile(path.join(__dirname, 'FrontEnd', 'Match.html'));
  });

// Start the server
app.listen(5000, () => console.log('Server is running on http://localhost:5000/'));
