// controllers/authController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const argon2 = require('argon2');

exports.register = async (req, res) => {
  const { username, password, mac_address, registrationPassword } = req.body;

  if (registrationPassword !== process.env.REGISTRATION_PASSWORD) {
    return res.status(403).json({ message: 'Forbidden: Invalid registration password' });
  }

  try {
    
    const newUser = new User({ username, password, mac_address });
    await newUser.save();
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};




exports.test = async (req, res) => {
  
    res.status(200).json({ message: 'API work' });
  
};



exports.login = async (req, res) => {
  const { username, password, mac_address } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    
    // Check if user exists, MAC address matches, and password is correct
    if (
      !user || 
      user.mac_address !== mac_address || 
      !(await argon2.verify(user.password, password))
    ) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};