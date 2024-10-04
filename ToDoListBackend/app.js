const express = require("express")
const cors = require("cors")
const app = express();
const Todos = require("./models/Todo")
const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(`mongodb+srv://${process.env.MONGODB_API_KEY}@cluster0.fw3p5.mongodb.net/`)
const corsOptions = {origin: 'https://react-projects-ten-lemon.vercel.app', optionsSuccessStatus: 200}
app.use(cors({

    origin: 'https://react-projects-ten-lemon.vercel.app',
  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  
    allowedHeaders: ['Content-Type']
  
  }));
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'react-projects-ten-lemon.vercel.app');
    res.header('Access-Control-Allow-Methods', "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.header('Access-Control-Allow-Headers', "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
    };
    next();
    });

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

