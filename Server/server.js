const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const { readdirSync } = require('fs');
const cors = require('cors');

const authRouter = require('./routes/auth');
const CategoryRouter = require('./routes/category');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

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
