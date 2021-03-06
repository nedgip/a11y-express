if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const helmet = require('helmet')
const app = express();
const expressLayouts = require("express-ejs-layouts");
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const bodyParser = require('body-parser')

// Passport config
require('./config/passport')(passport)

//Security (Headers)
const expectCt = require('expect-ct')
app.disable('x-powered-by')
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
  }
}))
app.use(helmet.xssFilter({ reportUri: '/report-xss-violation' }))
app.use(helmet.noSniff())
app.use(helmet.frameguard({ action: 'DENY' }))
const sixtyDaysInSeconds = 5184000
app.use(helmet.hsts({
  maxAge: sixtyDaysInSeconds
}))
app.use(helmet.referrerPolicy({ policy: 'same-origin' }))
app.use(helmet.ieNoOpen())
app.use(helmet.featurePolicy({
  features: {
    fullscreen: ["'self'"],
    vibrate: ["'none'"],
    syncXhr: ["'none'"],
    microphone: ["'none"],
    camera: ["'none"],

  }
}))
app.use(expectCt({
  enforce: true,
  maxAge: 123
}))

// EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Public files}
app.use(express.static("public"));

//Express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Connect flash
app.use(flash())

//Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  next()
})

// Database
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.log(error);
});
db.once("open", () => {
  console.log("Connected to mongoose");
});

// Routes
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
app.use("/", indexRouter);
app.use("/", userRouter);

app.listen(process.env.PORT || 3000);
