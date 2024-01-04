const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Parse JSON request bodies
app.use(session({
  secret: 'your-secret-key',
  resave: true,
  saveUninitialized: true
}));

// MongoDB connection
mongoose.connect(
'mongodb+srv://suraj:suraj@cluster0.39zkvpe.mongodb.net/Emotion_Analyzer?retryWrites=true&w=majority'
  , {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// Create a user schema and model
const userSchema = new mongoose.Schema({
  firstname: String, // New field: First Name
  lastname: String, // New field: Last Name
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);


app.post('/register', (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  
  // Check if the email already exists in the database
  User.findOne({ email })
    .then(existingUser => {
      if (existingUser) {

        // Email already exists
        res.json({"error " : "Email already exists"});
      } else {
        // Create a new user
        const newUser = new User({ firstname, lastname, email, password });
        
        // Save the user to the database
        newUser.save()
          .then(() => {
            res.json(newUser);
          })
          .catch(err => {
            console.log('Failed to register user', err);
            res.json({"error " : "Failed to register user"});
          });
      }
    })
    .catch(err => {
      console.log('Failed to check email existence', err);
      res.json({"error " : "Failed to check email existence"});
    });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Find the user by email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        // User not found
        res.render('login', { error: 'Invalid email or password' });
      } else {
        // Check the password
        if (user.password === password) {
          // Successful login
          res.json(user);
        } else {
          // Incorrect password
          res.json({"error " : "Invalid Password"});
        }
      }
    })
    .catch(err => {
      console.log('Failed to login', err);
      res.json({"error " : "Something went wrong"});
    });
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard'); 
});

app.listen(8000, () => {
  console.log('Server started on http://localhost:8000');
});

