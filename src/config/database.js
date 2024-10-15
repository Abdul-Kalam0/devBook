const mongoose = require("mongoose");

const connecDB = async () => {
  await mongoose.connect(
    "mongodb+srv://Backend:CSLJnOBYhan0CNcm@backed.xkec5.mongodb.net/devBook"
  );
};

module.exports = connecDB;
