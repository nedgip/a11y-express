const express = require("express");
const router = express.Router();
const { Authenticated, NotAuthenticated } = require('../config/auth')
// const User = require('../models/User')
// const Speed = require('../models/Speed')

//Welcome page
router.get("/", Authenticated, (req, res) => {
  res.locals.title = 'Dashboard - Speedcuber'
  res.render("index", {
    name: req.user.name
  });
});

//Speed handle
router.post('/', Authenticated, (req, res) => {

})


module.exports = router;
