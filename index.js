const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// In-Memory Database
let users = [
    { id: 1, name: "Ali", role: "Developer" },
    { id: 2, name: "Sara", role: "Designer" }
];

app.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    res.json(user);
});

app.post('/api/users', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({ message: "Name is required!" });
    }

    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        role: req.body.role || "User"
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.role = req.body.role || user.role;

    res.json({ message: "User updated successfully", user });
});

app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const initialLength = users.length;
    
    users = users.filter(u => u.id !== userId);

    if (users.length === initialLength) {
        return res.status(404).json({ message: "User not found to delete" });
    }

    res.json({ message: `User with ID ${userId} deleted.` });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Expert API running at http://localhost:${PORT}`);
});