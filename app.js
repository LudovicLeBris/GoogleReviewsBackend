const express = require('express');
const sequelize = require('./src/db/sequelize.js')
let cron = require('node-cron')
const updateProcess = require('./src/services/googleapi.js')
const {Places, Reviews} = require('./src/db/sequelize.js')

const app = express();
const port = process.env.PORT || 3000;

sequelize.initDb()

cron.schedule('* */24 * * *', () => {
    Places.findAll().then(places => {
        places.forEach(place => {
            updateProcess(place.id)
        });
    })
})

app.get('/', (req, res) => {
    res.json('GoogleReviewsAPI')
})

require('./src/routes/getPlaceReviews.js')(app)
require('./src/routes/addPlaceReviews.js')(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
