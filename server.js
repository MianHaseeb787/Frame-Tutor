const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port =  8080 || process.env.port;

const app = express();




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
// app.use('/', require('./routes/user'))
// app.use('/', require('./routes/menuitem'))
app.use('/users', require('./routes/users'));
app.use('/courses', require('./routes/courses'));



// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/DB121', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Event handler for MongoDB connection
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
