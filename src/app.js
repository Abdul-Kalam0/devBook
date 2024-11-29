const express = require("express");
const app = express();

const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
  //creating the new instance of user model
  const data = new User(req.body);
  try {
    await data.save();
    res.send("done");
  } catch (err) {
    res.status(400).send("something went wrong:" + err.message);
  }
});

// find user by email
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.email;
//   try {
//     const user = await User.findOne({ email: userEmail });
//     if (user.length === 0) {
//       res.status(404).send("user not found");
//     }
//     res.send(user);
//   } catch (err) {
//     console.error("something went wrong");
//   }
// });

// find the user by id
app.get("/user", async (req, res) => {
  const userId = req.body._id;
  console.log(userId);
  try {
    const user = await User.findById(userId); // Directly pass the ID
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

//get all user
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {}
});

// get the first user form the collecton of users
app.get("/feed", async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const users = await User.findOne({ email: email });
    res.send(users);
  } catch (err) {}
});

// delete the user by id
app.get("/delete", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send(user);
  } catch (err) {}
});

// update the user data
app.patch("/update/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    // what fields will be allowed to update
    const ALLOWED_UPDATE = ["photourl", "about", "gender", "age"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.every(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    // skills more than 10 are not allowed
    if (data?.skills?.length > 10) {
      throw new Error("Skills more that 10 are not allowed");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    console.log(user);

    res.send("done");
  } catch (err) {
    res.send("somthing went wrong", +err.message);
  }
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
