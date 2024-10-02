const mongoose = require('mongoose')
const { Schema } = mongoose
const todoSchema = new Schema({id:Number, text:{type:String, require: true}, name:String, completed:{type:Boolean, default:false}},{timestamp:true})
module.exports = mongoose.model("Todo", todoSchema)