const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();

//Created signup API
app.post("/signup", async (req, res) => {
  //Creating the new Instance
  const user = new User({
    firstName: "islam",
    lastName: "nabi",
    mailId: "islam@nabi.com",
  });
  try {
    await user.save();
    res.send("Added user Succesfully");
  } catch (err) {
    res.status(400).send("Error data is not saved" + err.message());
  }
});

connectDB()
  .then(() => {
    console.log("Connection to Database is Succesfull...");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000.....");
    });
  })
  .catch((err) => console.error("Connetion to Database is failed!!!"));
