if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

// EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);

// Bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Database
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
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
