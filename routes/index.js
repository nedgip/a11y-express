const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth')

//Welcome page
router.get("/", (req, res) => {
  res.render("index");
});

//Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard/dashboard", {
    name: req.user.name
  });
});
module.exports = router;
