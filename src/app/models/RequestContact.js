const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const RequestContact = new Schema({
  index: ObjectId,
  user_fullname: {
    type: String, // Kiểu dữ liệu là chuỗi
    required: true, // Bắt buộc phải có
  },
  user_email: {
    type: String,
    require: true,
  },
  user_message: {
    type: String,
    require: true,
  },
  createAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model('RequestContact', RequestContact)


