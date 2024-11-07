class BlogController {
    index(req, res) {
        res.render('blog', { isBlog: true })
    }

    details(req, res) {
        res.render('details-blog', { isDetailsBlog: true })
    }
}

module.exports = new BlogController