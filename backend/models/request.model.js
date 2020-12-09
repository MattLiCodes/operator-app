const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    name: { type: String, required: true },
    bed: { type: String, required: true },
    description: { type: String, required: true },
    staff: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: Boolean, required: true },
    completed: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
