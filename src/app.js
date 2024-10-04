const express = require("express");

const app = express();

// this function is know as request handler

app.use((req, res) => {
  res.send("Hello");
});

app.use("/test", (req, res) => {
  res.send("test");
});

app.listen(3000, () => {
  console.log("Server is successfully listening on port 3000.....");
});
