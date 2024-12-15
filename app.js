// app.js
const express = require('express');
const connectDB = require('./database');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');


const app = express();

// Connect to Database
connectDB();

app.use(cors());  // This enables CORS for all routes and origins
app.use(express.json({ extended: false })); // To parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', userRoutes);

// Routes
app.use('/api/auth', authRoutes);

// Test route to check server health
app.get('/', (req, res) => res.send('API Running'));

// Setup the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
