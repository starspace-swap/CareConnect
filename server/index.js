require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const AssistantModel = require('./models/Assistants');
const UserModel = require('./models/Users');
const BookingModel = require('./models/Bookings');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Error:", err));

// -------- Routes --------

// Test route
app.get("/api/test", (req,res) => res.json({ message: "Server working!" }));

// User Register
app.post("/api/users/register", async (req,res)=>{
    const { name,email,password } = req.body;
    if(!name || !email || !password) return res.status(400).json({message:"All fields required"});
    const existing = await UserModel.findOne({ email });
    if(existing) return res.status(400).json({message:"Email already registered"});
    const user = await UserModel.create({ name,email,password });
    res.json({ message:"User registered", user, role:"user" });
});

// User Login
app.post("/api/users/login", async (req,res)=>{
    const { email,password } = req.body;
    const user = await UserModel.findOne({ email,password });
    if(!user) return res.status(401).json({ message:"Login failed" });
    res.json({ message:"Login successful", user, role:"user" });
});

// Assistant Register
app.post("/AssistantRegister", async (req,res)=>{
    const { name,email,password,service } = req.body;
    const existing = await AssistantModel.findOne({ email });
    if(existing) return res.status(400).json({message:"Email already registered"});
    const assistant = await AssistantModel.create({ name,email,password,service });
    res.json({ message:"Assistant registered", assistant, role:"assistant" });
});

// Assistant Login
app.post("/api/assistants/login", async (req,res)=>{
    const { email,password } = req.body;
    const assistant = await AssistantModel.findOne({ email,password });
    if(!assistant) return res.status(401).json({ message:"Login failed" });
    res.json({ message:"Login successful", assistant, role:"assistant" });
});

// Combined Login (frontend-friendly)
app.post("/api/login-combined", async (req,res)=>{
    const { email,password } = req.body;

    // Try User first
    const user = await UserModel.findOne({ email,password });
    if(user) return res.json({ role:"user", user });

    // Try Assistant
    const assistant = await AssistantModel.findOne({ email,password });
    if(assistant) return res.json({ role:"assistant", assistant });

    res.status(401).json({ message:"Login failed. Check credentials." });
});

// Get all assistants
app.get("/api/assistants", async (req,res)=>{
    const assistants = await AssistantModel.find({});
    res.json(assistants);
});

// Booking routes
app.post("/bookings", async (req,res)=>{
    const { user, assistantId, date } = req.body;
    const booking = await BookingModel.create({ user, assistantId, date });
    res.json({ message:"Booking successful", booking });
});

app.get("/bookings/:userEmail", async (req,res)=>{
    const { userEmail } = req.params;
    const bookings = await BookingModel.find({ user: userEmail }).populate('assistantId');
    const data = bookings.map(b => ({
        _id: b._id,
        assistantName: b.assistantId.name,
        date: b.date
    }));
    res.json(data);
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>console.log(`🚀 Server running on ${PORT}`));
