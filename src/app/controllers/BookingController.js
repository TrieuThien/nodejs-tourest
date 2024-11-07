const Booking = require('../models/Booking');
const moment = require('moment');
const SiteController = require('./SiteController')


class BookingController {
    index(req, res) {
        res.render('booking', { isBooking: true })
    }

    // [POST]
    registBooking(req, res, next) {
        var currentUserName = SiteController.getUserName();
        if (currentUserName === "") {
            res.redirect('/login?booking=false')
        }
        else {
            const newBooking = new Booking(req.body)
            
            // Gán username hiện tại để phân loại booking của user
            newBooking.username = currentUserName;
    
            newBooking.save()
                .then(() => {
                    res.redirect('/booking?booking=true')
                })
                .catch(next)
        }
    }
}

module.exports = new BookingController