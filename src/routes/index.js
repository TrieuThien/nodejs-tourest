const siteRouter = require('./site.route.js')
const tourRouter = require('./tours.route.js')
const blogRouter = require('./blog.route.js')
const bookingRouter = require('./booking.route.js')
const contactRouter = require('./contact.route.js')
function route(app) {
    
    app.use('/tours', tourRouter)
    app.use('/blog', blogRouter)
    app.use('/booking', bookingRouter)
    app.use('/contact-us', contactRouter)
    app.use('/', siteRouter)
}

module.exports = route;