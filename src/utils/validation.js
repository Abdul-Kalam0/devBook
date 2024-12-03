const validator = require("validator");
const bcrypt = require("bcrypt");

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

const validateUpdateProfileData = (req) => {
  const ALLOWED_FIELDS = [
    "firstName",
    "lastName",
    "email",
    "age",
    "country",
    "skills",
  ];
  const isAllowedFields = Object.keys(req.body).every((fields) =>
    ALLOWED_FIELDS.includes(fields)
  );
  return isAllowedFields;
};

const validatePassword = async (req) => {
  const { password } = req.body;
  // const passHash = bcrypt.hash(password, 10);
  const passwordHash = req.user.password;

  const isValid = await bcrypt.compare(password, passwordHash);
  return isValid;
};

module.exports = {
  validateSignUpData,
  validateUpdateProfileData,
  validatePassword,
};
