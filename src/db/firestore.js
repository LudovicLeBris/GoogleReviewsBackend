let db = null

if (process.env.NODE_ENV === 'production') {
    console.log('Initializing database in production mode')
    const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
    const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
    initializeApp({
        credential: applicationDefault()
    });
    db = getFirestore();
} else if (process.env.NODE_ENV === 'development') {
    console.log('Initializing database in development mode')
    const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
    const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
    const serviceAccount = require('./strange-mariner-413409-0cdde40dec4e.json');
    initializeApp({
        credential: cert(serviceAccount)
    });
    db = getFirestore();
}

const reviewsCollection = db.collection('reviews')

module.exports = reviewsCollection
