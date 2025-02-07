// Step 1: Import express
const path = require('path'); // Importing path module
const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs')
const cors = require('cors')

const authRouter = require('./routes/auth');
const CategoryRouter = require('./routes/category');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/category', CategoryRouter);

// Register routes from the routes directory
readdirSync(path.join(__dirname, 'routes')) // Corrected path to use __dirname
.map((c) => app.use('/api', require(`./routes/`+c)));

// app.post('/api', (req, res) => {
//     const { username, password } = req.body;
//     console.log(req.body); 
//     res.send('Eat Together API');
// });

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../FrontEnd")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../FrontEnd/Home.html"));
});

// Step 2: Start the server
app.listen(3000, () => console.log('Server is running on http://localhost:3000/'));
