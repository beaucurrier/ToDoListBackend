const express = require("express")
const cors = require("cors")
const app = express();
const Todos = require("./models/Todos")
const mongoose = require("mongoose")
require("dotenv").config()
app.use(express.json)
mongoose.connect(`${process.env.MONGODB_API_KEY}`)
app.use(cors())
app.get("/todos", async (req, res) =>{
    const todos = await Todos.find();
    res.json({todos:todos});
})
app.post("./add-item", async (req, res) => {
    await Todos.create(req.body)
})
app.post("./edit-item/:id", async (req, res) => {
    await Todos.findOneAndUpdate({id:req.params.id}, req.body)
})
app.delete("./delete-item/:id", async (req, res) => {
    await Todos.deleteOne({id:req.params.id})
})
app.listen(5000,() =>{
    console.log('server is running on Port 5000')
})

