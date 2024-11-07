
class ToursController {
    index(req, res) {
        res.render('tours', { isTours: true })
    }

    details(req, res) {
        res.render('details-tour', { isDetailsTour: true })
    }
}

module.exports = new ToursController