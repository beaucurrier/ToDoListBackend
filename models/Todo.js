const mongoose = require("mongoose");
const { Schema } = mongoose;
const todoSchema = new Schema(
  {
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Todos", todoSchema);