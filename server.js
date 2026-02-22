const express = require("express");
const app = express();
app.use(express.json()); //middleware

let users = [
  {
    id: 1,
    name: "Muhammad Sajjad",
  },
  {
    id: 2,
    name: "Ali",
  },
  {
    id: 3,
    name: "Khurram",
  },
];

//getting all user
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

//post newuser
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// 3. GET SINGLE USER (Params ka istemal)
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);
  user
    ? res.status(200).json({
        sucess: true,
        data: user,
      })
    : res.status(404).json({
        success: false,
        message: `User with ID ${userId} not found!`,
      });
});
app.listen(4000, () => console.log("Server is running at 4000"));
