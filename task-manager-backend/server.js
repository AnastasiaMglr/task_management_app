const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

// Route test
app.get("/", (req, res) => {
  res.send("API Task Manager OK 🚀");
});

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connecté à MongoDB");
    app.listen(5000, () => console.log("🚀 Serveur lancé sur http://localhost:5000"));
  })
  .catch((err) => console.error(err));
