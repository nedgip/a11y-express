const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const passport = require('passport')

//User model
const User = require('../models/User')

// Login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Register page
router.get("/register", (req, res) => {
  res.render("register");
});

// Register handle
router.post("/register", (req, res) => {
  console.log(req.body)
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
                res.redirect('/users/login')
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
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next)
})

module.exports = router;
