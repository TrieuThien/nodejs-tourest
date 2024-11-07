const RequestContact = require('../models/RequestContact')

class ContactController {
    index(req, res) {
        res.render('contact', { isContact: true })
    }

    send(req, res, next) {
        const newRequest = new RequestContact(req.body)
        newRequest.save()
            .then(() => {
                res.redirect('/contact-us?send-request=true')
            })
            .catch(next)
    }
}

module.exports = new ContactController