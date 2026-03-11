// const express = require("express");
// const app = express();
// app.use(express.json()); //middleware

// let users = [
//   {
//     id: 1,
//     name: "Muhammad Sajjad",
//   },
//   {
//     id: 2,
//     name: "Ali",
//   },
//   {
//     id: 3,
//     name: "Khurram",
//   },
// ];

// //getting all user
// app.get("/users", (req, res) => {
//   res.status(200).json(users);
// });

// //post newuser
// app.post("/users", (req, res) => {
//   const newUser = {
//     id: users.length + 1,
//     name: req.body.name,
//   };

//   users.push(newUser);
//   res.status(201).json(newUser);
// });

// // 3. GET SINGLE USER 
// app.get("/users/:id", (req, res) => {
//   const userId = parseInt(req.params.id);
//   const user = users.find((u) => u.id === userId);
//   user
//     ? res.status(200).json({
//         sucess: true,
//         data: user,
//       })
//     : res.status(404).json({
//         success: false,
//         message: `User with ID ${userId} not found!`,
//       });
// });
// app.listen(4000, () => console.log("Server is running at 4000"));


const express = require('express');
const app = express();
app.use(express.json());
let users = [
    { id: 1, name: "Ali", role: "Developer" },
    { id: 2, name: "Sara", role: "Designer" }
];

// 1. [GET] 
app.get('/api/users', (req, res) => {
    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    });
});

// 2. [GET by ID] 
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); 
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found!" });
    }
    res.status(200).json({ success: true, data: user });
});

// 3. [POST] 
app.post('/api/users', (req, res) => {
    if (!req.body.name || !req.body.role) {
        return res.status(400).json({ success: false, message: "Please provide name and role" });
    }

    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        role: req.body.role
    };

    users.push(newUser);
    res.status(201).json({ success: true, data: newUser });
});

// 4. [PUT]
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.name = req.body.name || user.name;
    user.role = req.body.role || user.role;

    res.status(200).json({ success: true, message: "User updated", data: user });
});

// 5. [DELETE] 
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const initialCount = users.length;
    
    users = users.filter(u => u.id !== userId);

    if (users.length === initialCount) {
        return res.status(404).json({ success: false, message: "User not found to delete" });
    }

    res.status(200).json({ success: true, message: `User ${userId} deleted successfully` });
});

// Port Configuration
const PORT = 4000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));