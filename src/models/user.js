const mongoones = require("mongoose");

// Schema
const userSchema = new mongoones.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phoneNo: {
    type: Number,
  },
  mailId: {
    type: String,
  },
  password: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

//Model
module.exports = mongoones.model("User", userSchema);
