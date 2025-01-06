// Import necessary modules
const express = require('express');
require("dotenv").config();
const cors = require("cors");
const User = require('./DataBase/model/User.js');
const connection = require("./DataBase/connection.js")
const app = express();
const port = 8000;  // You can change this port as needed

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());


app.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
  
    const newUser = new User({ username, password });
    await newUser.save();
  
    res.status(201).json({ message: 'User registered successfully' });
  });


  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    res.json({ message: 'Login successful' });
  });

connection();
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
