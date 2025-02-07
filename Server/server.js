// Step 1: Import express
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
readdirSync('./routes')
.map((c) => app.use('/api', require(`./routes/`+c)));

// app.post('/api', (req, res) => {
//     const { username, password } = req.body;
//     console.log(req.body); 
//     res.send('Eat Together API');
// });

// Step 2: Start the server
app.listen(3000, () => console.log('Server is running on port 3000'));
