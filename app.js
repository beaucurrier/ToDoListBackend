const express = require("express");
const cors = require("cors");
const app = express();
const Todo = require('./models/Todo');
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(`mongodb+srv://${process.env.MONGODB_API_KEY}@cluster0.fw3p5.mongodb.net/`);
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "react-projects-ten-lemon.vercel.app",
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json({ todos: todos });
});
app.post("/add-item", async (req, res) => {
  const newTodo = await Todo.create(req.body);
  res.json(newTodo);
});
app.post("/edit-item/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
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
  await Todo.deleteOne({ _id: req.params.id });
  res.json({ message: "todo was deleted successfully!" });
});
app.listen(PORT, "0.0.0.0", () => {
  console.log("server is running on Port 5000");
});