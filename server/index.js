require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Models
const AssistantModel = require('./models/Assistants');
const UserModel = require('./models/Users');

const app = express();

// ---------------- MIDDLEWARES ---------------- //
app.use(cors());
app.use(express.json());

// ---------------- MONGO CONNECTION ---------------- //
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("✅ MongoDB Connected");
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => console.error("❌ MongoDB Connection Error:", err.message));

// ---------------- ROUTES ---------------- //

// Test route
app.get("/api/test", (req, res) => res.json({ message: "Server working!" }));

// --------- Assistant Routes --------- //
// 3. Create a new user (Create)
app.post("/AssistantRegister", (req, res) => { // - Defines a POST route to create a new user
    UserModel.create(req.body) // - Creates a new document using the data from the request body
        .then(assistants => res.json(assistants)) // - Sends the created user as JSON
        .catch(err => res.json(err));
});

app.get("/api/assistants", async (req, res) => {
    try {
        const assistants = await AssistantModel.find({});
        res.json(assistants);
    } catch (err) {
        console.error("❌ Assistant Fetch Error:", err.message);
        res.status(500).json({ message: err.message });
    }
});

// --------- User Routes --------- //
app.post("/api/users/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required" });
        }

        const existing = await UserModel.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const user = await UserModel.create({ name, email, password });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (err) {
        console.error("❌ User Register Error:", err.message);
        res.status(500).json({ message: err.message });
    }
});

app.post("/api/users/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await UserModel.findOne({ email, password });
        if (!user) return res.status(401).json({ message: "Login failed" });

        res.json({ message: "Login successful", user });
    } catch (err) {
        console.error("❌ User Login Error:", err.message);
        res.status(500).json({ message: err.message });
    }
});
