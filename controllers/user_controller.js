const User = require('../models/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const express = require("express");

const app = express();

// Middleware to parse cookies
app.use(cookieParser());

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users.', error });
  }
};

const createUser = async (req, res) => {
    try {
      // Extract user information from the request body
      const { username, email, password } = req.body;
  
      // Check if the required fields are provided
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required fields.' });
      }
  
      // Check if the user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists.' });
      }
  
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user using the User model
      const newUser = new User({ username, email, password: hashedPassword });
  
      // Save the user to the database
      await newUser.save();
  
      // Send a success response with the newly created user data
      res.status(201).json({ message: 'User created successfully.', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user.', error });
    }
  };
  
  const jwt = require('jsonwebtoken');

  // ... (Other imports and functions)
  
  // User sign-in with JWT generation
  const signInUser = async (req, res) => {
    try {
      // Extract username and password from the request body
      const { email, password } = req.body;
  
      // Check if the required fields are provided
      if (!email || !password) {
        return res.status(400).json({ message: 'email and password are required fields.' });
      }
  
      // Find the user with the provided username
      const user = await User.findOne({ email  });
      // console.log(user.email);
      const  mail =  user.email;
  
      // If the user does not exist, return an error
      if (!mail) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      // If the password doesn't match, return an error
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials.' });
      }
  
      // Password is correct, user can be authenticated
  
     


  
      // Send the JWT in the response
      res.status(200).json({ message: 'User signed in successfully.', user : user });
      // console.log(token)
    } catch (error) {
      res.status(500).json({ message: 'Error signing in user.', error });
    }
  };


  
 

module.exports = {
    signInUser,
    createUser,
  getAllUsers,
  

};
