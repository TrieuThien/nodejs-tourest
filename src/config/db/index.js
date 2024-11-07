const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://dev:1ILswOqtboy8UJ6C@mydb.0qpn0.mongodb.net/Tourest?retryWrites=true&w=majority&appName=myDB');
        console.log("Connect successfuly!!!")
    } catch (error) {
        console.log("Connect failure!!!")
        console.log(error)
    }
}

module.exports = {connect}
'mongodb+srv://dev:1ILswOqtboy8UJ6C@mydb.0qpn0.mongodb.net/?retryWrites=true&w=majority&appName=myDB';