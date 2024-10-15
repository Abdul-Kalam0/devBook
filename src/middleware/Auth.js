const adminAuth = (req, res, next) => {
  console.log("Auth is getting checked!");
  const token = "abc";
  const isAdminAutorized = token === "abc";
  if (!isAdminAutorized) {
    res.status(401).send("Unauthorized Access");
  } else {
    next();
  }
};

const userAuth = (req, res, next) => {
  console.log("User is not Authorized!");
  const token = "xyz";
  const isUserAuthorized = token === "xyz1";
  if (!isUserAuthorized) {
    res.status(401).send("user is not Authorized");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
  userAuth,
};
