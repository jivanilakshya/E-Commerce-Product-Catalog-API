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

app.post("/users", (req, res) => {
  
  const body = req.body;
  users.push({...body});
  
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users),(err, data) => {
    return res.status(202).json({ message: "Product was Added." });
  });
});

const getUsers = () => {
  const data = fs.readFileSync("MOCK_DATA.json");
  return JSON.parse(data);
};
const saveUsers = (users) => {
  fs.writeFileSync("data.json", JSON.stringify(users, null, 2));
};

app.patch("/users/:id", (req, res) => {
  const users = getUsers();
  const userId = parseInt(req.params.id);
  const { id,product_name,price,category,brand,stock_quantity } = req.body;

  const userIndex = users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
  }

  if (id) users[userIndex].id = id;
  if (product_name) users[userIndex].product_name =product_name;
  if (price) users[userIndex].price = price;
  if (category) users[userIndex].category = category;
  if (brand) users[userIndex].brand = brand;
  if (stock_quantity) users[userIndex].stock_quantity = stock_quantity;

  saveUsers(users);
  res.json({ message: "User updated successfully", user: users[userIndex] });
});



app.delete("/users/:id", (req, res) => {
  const users = getUsers();
  const userId = parseInt(req.params.id);

  const newUsers = users.filter(user => user.id !== userId);

  if (users.length === newUsers.length) {
      return res.status(404).json({ message: "Product not found" });
  }
  res.json({ message: "Product deleted successfully" });
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}/users`);
});
