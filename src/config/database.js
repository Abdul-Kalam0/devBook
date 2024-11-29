const mongoose = require("mongoose");

// connecting to the DB
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Backend:CSLJnOBYhan0CNcm@backed.xkec5.mongodb.net/devBook"
  );
};

module.exports = connectDB;
