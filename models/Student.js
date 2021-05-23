const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: String,
  dob: Date,
  mobile: String,
  address: String,
});

// tat ca phai them chu s dang sau
module.exports = mongoose.model("students", StudentSchema);
