const express = require("express")
const cors = require("cors")
const app = express();
const Todos = require("./models/Todo")
const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(`mongodb+srv://${process.env.MONGODB_API_KEY}@cluster0.fw3p5.mongodb.net/`)
const corsOptions = {origin: 'https://react-projects-ten-lemon.vercel.app/', optionsSuccessStatus: 200}
app.use(cors(corsOptions))
app.use(express.json())
app.get("/todos", async (req, res) =>{
    const todos = await Todos.find();
    res.json({todos:todos});
})
app.post("/add-item", async (req, res) => {
    const newToDo = await Todos.create(req.body)
    res.json(newToDo)
})
app.post("/edit-item/:id", async (req, res) => {
    const updatedTodo = await Todos.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { text: req.body.text, completed: req.body.completed } }, // Update both task and completed status
        { new: true }
      );
      res.json(updatedTodo);
})
app.delete("/delete-item/:id", async (req, res) => {
    await Todos.deleteOne({_id:req.params.id})
})
app.listen(5000,() =>{
    console.log('server is running on Port 5000')
})

