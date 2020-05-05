const express = require("express");
const router = express.Router();
const { Authenticated, NotAuthenticated } = require("../config/auth");
const User = require("../models/User");
const Speed = require("../models/Speed");

//Welcome page
router.get("/", Authenticated, async (req, res) => {
  res.locals.title = "Dashboard - Speedcuber";
  let speeds
  const thisUserId = req.user._id
  try {
    console.log(thisUserId)
    speeds = await Speed.find({ id: thisUserId })
    console.log(speeds)
  } catch {
    console.log('Not working')
    speeds = []
  }
  res.render('index', { name: req.user.name, speeds: speeds, date: speeds })
});

//Speed handle
router.post("/", Authenticated, async (req, res) => {
  const speed = new Speed({
    speed: req.body.speed,
    userId: req.user._id,
    name: req.user.name,
  });
  try {
    const result = await speed.save();
    console.log(result);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

module.exports = router;
