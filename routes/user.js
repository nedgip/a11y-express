const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')
const { Authenticated, NotAuthenticated } = require('../config/auth')

//User model
const User = require('../models/User')

// Login page
router.get("/login", NotAuthenticated, (req, res) => {
  res.locals.title = 'Log in - Speedcuber'
  res.render("login");
});

// Register page
router.get("/register", NotAuthenticated, (req, res) => {
  res.locals.title = 'Register - Speedcuber'
  res.render("register");
});

// Register handle
router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ msg: "Please fill in all of the fields" });
  }

  // Check passwords match
  if (password != confirmPassword) {
    errors.push({ msg: "Passwords do not match" });
  }

  //check password length
  if (password.length < 8) {
    errors.push({ msg: "Password should be at least 8 characters long" });
  }

  if (errors.length > 0) {
    res.locals.title = 'Register - Speedcuber'
    res.render("register", {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  } else {
    // Validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        //User exists
        errors.push({ msg: 'Email is already registered' })
        res.locals.title = 'Register - Speedcuber'
        res.render("register", {
          errors,
          name,
          email,
          password,
          confirmPassword,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        })
        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Stet password to hashed
            newUser.password = hash
            //Save user
            newUser.save()
              .then(user => {
                req.flash('success_msg', 'Your are now registered.')
                res.redirect('/login')
              })
              .catch(err => console.log(err))
          })
        })
      }
    })
  }
});


//Login handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next)
})


//Logout handle
router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', `You're are logged out`)
  res.redirect('/login')
})

module.exports = router;
