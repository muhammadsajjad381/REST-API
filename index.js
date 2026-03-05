const express = require('express');
const app = express();

// Middleware: JSON body ko read karne ke liye (Essential)
app.use(express.json());

// In-Memory Database (Array)
let users = [
    { id: 1, name: "Ali", role: "Developer" },
    { id: 2, name: "Sara", role: "Designer" }
];

// 1. [GET] - Sab users ki list hasil karein
app.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

// 2. [GET by ID] - Specific user ko dhoondein
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // String ko Number mein badla
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ message: "User not found!" });
    }
    res.json(user);
});

// 3. [POST] - Naya user add karein
app.post('/api/users', (req, res) => {
    // Basic Validation
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

// 4. [PUT] - User data update karein
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update Logic (Expert Tip: Use || to keep old value if new one isn't provided)
    user.name = req.body.name || user.name;
    user.role = req.body.role || user.role;

    res.json({ message: "User updated successfully", user });
});

// 5. [DELETE] - User ko remove karein
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const initialLength = users.length;
    
    users = users.filter(u => u.id !== userId);

    if (users.length === initialLength) {
        return res.status(404).json({ message: "User not found to delete" });
    }

    res.json({ message: `User with ID ${userId} deleted.` });
});

// Server Configuration
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`🚀 Expert API running at http://localhost:${PORT}`);
});