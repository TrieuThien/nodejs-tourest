const path = require('path');
const express = require('express');
const { engine: handlebars} = require('express-handlebars');

// Khởi tạo thư viện Express
const app = express();

// Khai báo database
const db = require('./config/db')

// Connect to db 
db.connect()

// Khởi tạo port chạy website
const port = 3000

// Midleware xử lí dữ liệu
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

// Khởi tạo route - định nghĩa các URI của website
const route = require('./routes');

// Chỉ định static file
app.use(express.static(path.join(__dirname, 'public')));

// Khởi tạo template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        layoutsDir: path.join(__dirname, 'resources', 'views', 'layouts'),
        defaultLayout: 'main.hbs', // Đặt layout mặc định là main
        partialsDir: path.join(__dirname, 'resources', 'views', 'partials'),
        // Khởi tạo biến đếm sử dụng cho mục đích in danh sách cần số thứ tự
        helpers: {
            counter: function(index) {
                return index + 1;
            }
        }
    })
);

// app.engine('hbs', hbs.engine);
// Set engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));


route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});