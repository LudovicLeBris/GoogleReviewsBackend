const {Places, Reviews} = require('../db/sequelize')
const reviewsCollection = require('../db/firestore')

// module.exports = (app) => {
//     app.get('/:placeId', async (req, res) => {
//         Places.findOne({where: {id: req.params.placeId}, include: Reviews}).then(place => {
//             if (place) {
//                 res.json({place})
//             } else {
//                 res.status(400).json({"errors": {"code": 400, "message": "Place Id not found: make a POST request instead"}})
//             }
//         })
//         .catch(error => console.error(error))
//     })
// }

module.exports = (app) => {
    app.get('/:placeId', async (req, res) => {
        const placeRef = reviewsCollection.doc(req.params.placeId)
        const doc = await placeRef.get()
        if (!doc.exists) {
            res.json({"errors": {"code": 400, "message": "Place Id not found: make a POST request instead"}})
        } else {
            res.json(doc.data())
        }
    })
}