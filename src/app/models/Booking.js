const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Booking = new Schema({
  index: ObjectId,
  username: String,
  fullname: String,
  email: String,
  country: String,
  date: Date,
  time: String,
  guests: Number,
  createAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model('Booking', Booking)


