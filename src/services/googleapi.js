const fetch = require('node-fetch')
const {Places, Reviews} = require('../db/sequelize')
const fakeData = require('../services/responseExample')

// Required fields for Google place api(new)
// https://developers.google.com/maps/documentation/places/web-service/place-details#required-parameters
const fields = [
    'displayName',
    'rating',
    'userRatingCount',
    'reviews'
]

async function getGooglePlaceData(apiKey, placeId) {
    const apiURL = `https://places.googleapis.com/v1/places/${placeId}?fields=${fields.join(',')}&key=${apiKey}`
    const response = await fetch(apiURL)
    const data = await response.json()
    return Promise.resolve(data)
}

function savePlace(placeId, placeData) {
    Places.findByPk(placeId)
        .then(place => {
            if(place) {
                Places.update({
                    name: placeData.displayName.text,
                    rating: placeData.rating,
                    reviewCount: placeData.userRatingCount
                },
                {where: {id: placeId}})
            } else {
                Places.create({
                    id: placeId,
                    name: placeData.displayName.text,
                    rating: placeData.rating,
                    reviewCount: placeData.userRatingCount
                })
            }
        })
}

function saveReviews(placeId, placeData) {
    Reviews.findAll({where: {placeId: placeId}})
        .then(reviews => {
            if (reviews.length === 5) {
                console.log('UPDATE !!!')
                for (let index = 0; index < reviews.length; index++) {
                    Reviews.update({
                        authorName: placeData.reviews[index].authorAttribution.displayName,
                        authorImage: placeData.reviews[index].authorAttribution.photoUri,
                        authorUri: placeData.reviews[index].authorAttribution.uri,
                        rating: placeData.reviews[index].rating,
                        publishedDate: placeData.reviews[index].publishTime,
                        content: placeData.reviews[index].originalText.text
                    },{where: {id: reviews[index].id}})
                }
            } else if (reviews.length === 0) {
                console.log('CREATE !!!')
                placeData.reviews.forEach(review => {
                    Reviews.create({
                        PlaceId: placeId,
                        authorName: review.authorAttribution.displayName,
                        authorImage: review.authorAttribution.photoUri,
                        authorUri: review.authorAttribution.uri,
                        rating: review.rating,
                        publishedDate: review.publishTime,
                        content: review.originalText.text
                    })
                })
            } else {
                console.log("ARRANGE !!!")
                reviews.forEach(review => {
                    Reviews.destroy({where: {id: review.id}})
                })
                placeData.reviews.forEach(review => {
                    Reviews.create({
                        PlaceId: placeId,
                        authorName: review.authorAttribution.displayName,
                        authorImage: review.authorAttribution.photoUri,
                        authorUri: review.authorAttribution.uri,
                        rating: review.rating,
                        publishedDate: review.publishTime,
                        content: review.originalText.text
                    })
                })
            }
        }
    )
}

async function updateProcess(placeId) {
    const apiData = await getGooglePlaceData(process.env.APIKEY, placeId)
    // const apiData = await fakeData
    if (!apiData.errors) {
        await savePlace(placeId, apiData)
        await saveReviews(placeId, apiData)
        return {"success": "Process correctly done one place"}
    } else {
        return apiData
    }
}

module.exports = updateProcess

