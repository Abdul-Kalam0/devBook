const validator = require("validator");

const validateSignUpData = (req) => {
  console.log(req.body);

  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("please enter the valid password");
  }
};

module.exports = {
  validateSignUpData,
};
