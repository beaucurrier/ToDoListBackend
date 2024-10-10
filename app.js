const express = require("express");
const cors = require("cors");
const app = express();
const Todos = require("./models/Todos");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(`${process.env.MONGODB_API_KEY}`);
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "react-projects-ten-lemon.vercel.app",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/todos", async (req, res) => {
  const todos = await Todos.find();
  res.json({ todos: todos });
});
app.post("/add-item", async (req, res) => {
  const newTodo = await Todos.create(req.body);
  res.json(newTodo);
});
app.post("/edit-item/:id", async (req, res) => {
  try {
    const updatedTodo = await Todos.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { text: req.body.text, completed: req.body.completed } },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: "failed to update todo" });
  }
});
app.delete("/delete-item/:id", async (req, res) => {
  await Todos.deleteOne({ _id: req.params.id });
  res.json({ message: "todo was deleted successfully!" });
});
app.listen(PORT, "0.0.0.0", () => {
  console.log("server is running on Port 5000");
});