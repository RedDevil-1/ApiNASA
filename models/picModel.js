const mongoose = require("mongoose");

const picSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
});

const PIC = mongoose.model("PIC", picSchema);
module.exports = PIC;
