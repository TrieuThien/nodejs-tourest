const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  index: ObjectId,
  username: 
    { 
      type: String, 
      required: true, // Bắt buộc phải có
      unique: true // Phải là duy nhất
    },
  fullname: String,
  dateOfBirth: Date,
  email: { type: String, required: true },
  phone: { type: String, required: true },
  password: 
    {
      type: String,
      required: true,
    },
  
  createAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model('User', User)


