const express = require("express");
const router = express.Router();
const { Authenticated, NotAuthenticated } = require('../config/auth')

//Welcome page
router.get("/", NotAuthenticated, (req, res) => {
  res.render("index");
});

//Dashboard
router.get("/dashboard", Authenticated, (req, res) => {
  res.render("dashboard/dashboard", {
    name: req.user.name
  });
});
module.exports = router;
