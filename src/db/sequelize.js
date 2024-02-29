const {Sequelize, DataTypes} = require('sequelize')
const PlacesModel = require('../models/Places.js')
const ReviewsModel = require('../models/Reviews.js')

const sequelize = new Sequelize({
    dialect:"sqlite",
    storage:"./src/db/data.db"
})

const Places = PlacesModel(sequelize, DataTypes)
const Reviews = ReviewsModel(sequelize, DataTypes)
Places.hasMany(Reviews)
Reviews.belongsTo(Places)

const initDb = () => {
    return sequelize.sync({force: false})
    .then(_ => {
        console.log('Database correctly initialized.')
    })
}

module.exports = {
    initDb, Places, Reviews
}