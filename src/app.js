const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

const cookieParser = require("cookie-parser");

// to read json format data in console
app.use(express.json());
// to read the cookies in the console
app.use(cookieParser());

// user makes any api req it will go every route group and check wheter that api route is present
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

// first connect with db then to server
connectDB()
  .then(() => {
    console.log("database connected succesfully....");
    app.listen(3000, () => {
      console.log("connected Succesfully ");
    });
  })
  .catch((err) => console.error("database not connected "));
