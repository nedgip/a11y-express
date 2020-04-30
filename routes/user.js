const express = require("express");
const router = express.Router();

// Login page
router.get("/login", (req, res) => {
  res.render("login");
});

// Register page
router.get("/register", (req, res) => {
  res.render("register");
});

// Register Handle
router.post("/register", (req, res) => {
  console.log(req.body)
  const { name, email, password, confirmPassword } = req.body;
  let errors = [];

  // Check required fields
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ msg: "Please fill in all of the fields" });
  }

  // Check passwords match
  if (password !== confirmPassword) {
    errors.push({ msg: "The passwords do not match" });
  }

  //check password length
  if (password.length < 8) {
    errors.push({ msg: "The password should be at least 8 characters long" });
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
    res.send("Success");
  }
});

module.exports = router;
