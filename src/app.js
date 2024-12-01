const express = require("express");
const app = express();

const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");

const validator = require("validator");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");
const { userAuth } = require("./middleware/Auth");

// to read json format data in console
app.use(express.json());
// to read the cookies in the console
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // design the utils for validation and call it here instead of writing the code here
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    // encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);

    //creating the new instance of user model
    const data = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await data.save();
    res.send("done");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate the email there is no method for password validator
    if (!validator.isEmail(email)) {
      throw new Error("Invalid email");
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("email not exist");
    }

    // compare the passwordHash is same as passwordHash stored in DB
    // it return true/false if true login else password is incorrect
    // validSchemaPassword is a helper function nside modules/user
    // i am calling validateSchemaPassword on user bcoz i have to validate the pass on the current user in user
    const isPasswordValid = await user.validateSchemaPassword(password);

    if (isPasswordValid) {
      // if password is also valid we will write the code for JWT bcoz we will send it with the data
      // add the token to cookie and resnd the response back to user
      // getJWT is a helper function inside modules/user
      const token = await user.getJWT();
      console.log(token);

      res.cookie("token", token);
      res.send("Loged In sucesfully");
    } else {
      throw new Error("Invalid password");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(404).send("ERROR: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  // sending the connection request only if the user is login for that we will use userAuth middleware
  res.send(user.firstName + " sent the connect request");
});

// first connect with db then to server
connectDB()
  .then(() => {
    console.log("database connected succesfully....");
    app.listen(3000, () => {
      console.log("connected Succesfully ");
    });
  })
  .catch((err) => console.error("database not connected "));
