const express = require("express");

const app = express();

//// this function is know as request handler

// this will handle GET calls to "/user"
app.get("/user", (req, res) => {
  res.send({ firstName: "Abdul", lastName: "Kalam" });
});

// this will handle PATCH calls to "/user"

app.patch("/user", (req, res) => {
  console.log("Bug is getting fixed");
  res.send("Bug fixed");
});

// this will handle POST calls to "/user"
app.post("/user", (req, res) => {
  console.log("saving data to DB");
  res.send("data successfully saved");
});

// this will handle DELETE calls to "/user"
app.delete("/user", (req, res) => {
  console.log("Deleting the data");
  res.send("Data Deleted Successfully");
});

// this will match all the HTTP metgod API calls to /test
app.use("/test", (req, res) => {
  res.send("test");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000.....");
});
