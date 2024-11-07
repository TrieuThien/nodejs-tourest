const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin = new Schema({
  index: ObjectId,
  username: {
    type: String, // Kiểu dữ liệu là chuỗi
    required: true, // Bắt buộc phải có
    unique: true // Phải là duy nhất
  },
  fullname: {
    type: String, // Kiểu dữ liệu là chuỗi
    required: true, // Bắt buộc phải có
    unique: true // Phải là duy nhất
  },
  role: {
    type: String, 
    required: true, 
    unique: true 
  },
  password: {
    type: String,
    required: true,
  },
  createAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model('Admin', Admin)


