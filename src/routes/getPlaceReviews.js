const {Places, Reviews} = require('../db/sequelize')

module.exports = (app) => {
    app.get('/:placeId', async (req, res) => {
        Places.findOne({where: {id: req.params.placeId}, include: Reviews}).then(place => {
            if (place) {
                res.json({place})
            } else {
                res.status(400).json({"errors": {"code": 400, "message": "Place Id not found: make a POST request instead"}})
            }
        })
        .catch(error => console.error(error))
    })
}