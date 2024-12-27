const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require('multer');
const path = require("path");
const UserModels = require("./models/User.js");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/crud", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));


  // Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  },
});

const upload = multer({ storage });

// Serve static files in the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes

// Add User with Image
app.post('/addUser', upload.single('image'), async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    console.log('Uploaded file:', req.file); // Log the uploaded file to check

    const newUser = new UserModels({ name, email, age, image: imagePath });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error adding user:", error); // Log the detailed error message
    res.status(500).json({ message: 'Error adding user', error: error.message });
  }
});


// Get all users
app.get("/", (req, res) => {
  UserModels.find({})
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Get user by ID
app.get("/getUser/:id", (req, res) => {
  const id = req.params.id; // Correctly access req.params.id
  UserModels.findById(id)
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found" });
      res.json(user);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Update user by ID
app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id;
  // Corrected method and body access
  UserModels.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age, // Fixed typo: changed `raq.body.age` to `req.body.age`
    },
    { new: true, runValidators: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
      res.json(updatedUser);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});


app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id;
  UserModels.findByIdAndDelete({ _id: id })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully", data: result });
    })
    .catch((err) => {
      res.status(500).json({ message: "Error deleting user", error: err });
    });
});

// Create a new user
app.post("/createUser", (req, res) => {
  UserModels.create(req.body)
    .then((user) => res.json({ success: true, data: user }))
    .catch((err) => res.status(400).json({ success: false, error: err.message }));
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

