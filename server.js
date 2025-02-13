const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;
const users = require("./MOCK_DATA.json");

app.use(express.json()); // it is collect you data from the buffer and convert it to json object

app.get("/users", (req, res) => {  //get all product
  res.json(users);
});

app.get("/users/:id", (req, res) => {    //get product by id
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });{}
  res.json(user);
});

app.get("/users/category/:category", (req, res) => {    //get product by it's category
  const category = req.params.category;
  
  const matchedUsers = users.filter(u => u.category.toLowerCase() === category.toLowerCase());
  
  if (matchedUsers.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  
  res.json(matchedUsers);
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}/users`);
});
