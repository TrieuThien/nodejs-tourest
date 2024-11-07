const User = require('../models/User')
const Admin = require('../models/Admin')
const Booking = require('../models/Booking')
const RequestContact = require('../models/RequestContact')
const moment = require('moment');

class SiteController {
    static checkAdminUser = false;
    static isUserLogin = false;
    static userName = "";
    static adminName = "";

    home(req, res) {
        res.render('home', { isHome: true })
    }

    aboutUs(req, res) {
        res.render('about-us', { isAboutUs: true })
    }

    destinations(req, res) {
        res.render('destinations', { isDestination: true })
    }

    // [GET] /dang-nhap
    renderLogin(req, res) {
        res.render('login', { isLoginSignUp: true })
    }

    // [POST] /login
    async login(req, res) {
        const clientUserName = req.body.username;
        const clientUserPass = req.body.password;

        try {
            const resultAdmin = await Admin.findOne({ username: clientUserName }).exec();
            if (resultAdmin && resultAdmin.password === clientUserPass) {
                SiteController.checkAdminUser = true;
                SiteController.adminName = clientUserName;
                return res.redirect('/admin');
            }

            const resultUser = await User.findOne({ username: clientUserName }).exec();
            if (resultUser && resultUser.password === clientUserPass) {
                SiteController.checkAdminUser = false;
                SiteController.isUserLogin = true;
                SiteController.userName = clientUserName
                return res.redirect('/user/?login=true');
            }
        }
        catch (error) {
        }
        return res.redirect('/login?login=false');
    }

    // [GET] /sign-up
    renderSignUp(req, res) {
        res.render('sign-up', { isLoginSignUp: true })
    }

    // [POST] /sign-up
    signUp(req, res, next) {
        const newUser = new User(req.body)
        newUser.save()
            .then(() => {
                res.redirect('/sign-up?signup=true')
            })
            .catch(() => {
                res.redirect('/sign-up?signup=false')
            })
    }

    // [POST] logout 
    logout(req, res) {
        SiteController.isUserLogin = false;
        SiteController.userName = "";
        res.render('home', { isHome: true });
    }

    // [GET] /account-page
    async accountPage(req, res) {
        if (SiteController.isUserLogin) {
            try {
                // Query tìm user hiện tại trên DB
                const currentUser = await User.findOne({ username: SiteController.userName }).exec();

                // Format lại ngày tháng để hiển thị trên website
                const userObject = currentUser.toObject();
                var dateNeedFomat = userObject.dateOfBirth;
                userObject.dateOfBirth = moment(dateNeedFomat).format('DD MMM YYYY');

                // Query lấy tất cả các lần booking của user
                const allBooking = await Booking.find({ username: SiteController.userName }).then(Booking => {
                    return Booking.map(item => item.toObject());
                });

                // Định dạng ngày tháng cho từng booking trong allBooking
                const formattedAllBookings = allBooking.map(booking => {
                    const bookingObject = booking;
                    if (bookingObject.date) {
                        bookingObject.date = moment(bookingObject.date).format('DD MMM YYYY');
                    }
                    return bookingObject;
                });

                if (currentUser) {
                    res.render('user-account', { isUserAccount: true, UserHandled: userObject, allBookingHadle: formattedAllBookings });
                } else {
                    res.redirect('/login');
                }

            } catch (err) {
                next(err);
            }
        }
        else {
            res.redirect('/login')
        }
    }

    async adminPage(req, res, next) {
        if (SiteController.checkAdminUser) {
            const currentAdmin = await Admin.findOne({ username: SiteController.adminName }).exec();
            const adminObject = currentAdmin.toObject();

            try {
                const [ReqestContactHandled, UserHandled] = await Promise.all([
                    RequestContact.find({}).then(RequestContact => {
                        return RequestContact.map(item => item.toObject());
                    }),
                    User.find({}).then(User => {
                        return User.map(item => item.toObject());
                    })
                ]);

                // Định dạng lại ngày tháng trước khi hiển thị trên website
                const formattedAllUser = UserHandled.map(user => {
                    const userObject = user;
                    if (userObject.dateOfBirth) {
                        userObject.dateOfBirth = moment(userObject.dateOfBirth).format('DD MMM YYYY');
                    }
                    return userObject;
                });

                res.render('admin-page', { isAdminPage: true, admin: adminObject, allRequestContact: ReqestContactHandled, allUsers: formattedAllUser});
            } catch (err) {
                next(err);
            }
        }
        else {
            res.send("Cannot access!");
        }
    }

    getUserName() {
        return SiteController.userName;
    }
}

module.exports = new SiteController;