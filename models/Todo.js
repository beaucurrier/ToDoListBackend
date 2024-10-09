const mongoose = require('mongoose')
const { Schema } = mongoose
const todoSchema = new Schema({ text:{type:String, required: true}, completed:{type:Boolean, default:false}},{timestamp:true})
module.exports = mongoose.model("Todo", todoSchema)