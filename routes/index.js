const express = require("express");
const router = express.Router();
const { Authenticated, NotAuthenticated } = require("../config/auth");
const User = require("../models/User");
const Speed = require("../models/Speed");
const { check, validationResult } = require('express-validator');

//Welcome page
router.get("/", Authenticated, async (req, res) => {
  res.locals.title = "Dashboard - Speedcuber";
  let speeds
  const thisUserId = req.user._id
  try {
    speeds = await Speed.find({
      userId: thisUserId
    }).sort({ date: 'desc' }).limit(10)
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


// Edit Speed Route
router.get('/:id/edit', async (req, res) => {
  try {
    const speed = await Speed.findById(req.params.id)
    renderEditPage(res, speed)
  } catch {
    res.redirect('/')
    console.log('Error: Can not edit speed')
  }
})

async function renderEditPage(res, speed, hasError = false) {
  renderFormPage(res, speed, 'edit', hasError)
}

async function renderFormPage(res, speed, form, hasError = false) {
  try {
    const speed = await Speed.find({})
    const params = {
      speed: speed
    }
    if (hasError) {
      if (form === 'edit') {
        params.errorMessage = 'Error Updating Speed'
      } else {
        params.errorMessage = 'Error Creating Speed'
      }
    }
    res.render(`/${form}`, params)
  } catch {
    res.redirect('/')
    console.log("Error: rendering from page")
  }
}
module.exports = router;
