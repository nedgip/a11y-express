const express = require("express");
const router = express.Router();
const { Authenticated, NotAuthenticated } = require('../config/auth')

//Welcome page
router.get("/", Authenticated, (req, res) => {
  res.locals.title = 'Dashboard - Speedcuber'
  res.render("index", {
    name: req.user.name
  });
});


module.exports = router;
