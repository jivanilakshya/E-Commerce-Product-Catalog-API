const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const users = require("./MOCK_DATA.json");

app.use(express.json()); // it is collect you data from the buffer and convert it to json object

app
  .get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });{}
  res.json(user);
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}/users`);
});
