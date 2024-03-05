const {Places, Reviews} = require('../db/sequelize')
const updateProcess = require('../services/googleapi')

module.exports = (app) => {
    app.post('/:placeId', async (req, res) => {
        updateProcess(req.params.placeId).then(process => {
            if (process.errors || process.error) {
                res.status(400).json(process)
            } else {
                res.json(process)
            }
        })
        .catch(error => console.error(error))
    })
}