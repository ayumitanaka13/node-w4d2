const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./models/user.model");

const keys = require("./config/keys");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
const authRoutes = require("./routes/auth.route");
app.use("/api/auth", authRoutes);

mongoose
  .connect(keys.mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    const PORT = process.env.port || 5000;
    app.listen(PORT, () => console.log("Sever is running"));
  })
  .catch((err) => console.log(err));
