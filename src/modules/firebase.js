const https = require('https')
const config = require('../config')
const admin = require('firebase-admin')
let stations = []

const serviceAccount = require(config.fbPrivateKey);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.fbDatabaseUrl
})

const db = admin.database();
const ref = db.ref("production")
console.log('start firease observer')
ref.on("value", function (snapshot) {
    stations = snapshot.val()
    console.log('stations updated')
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code)
})

function getStations() {
    return Promise.resolve(stations)
}

module.exports = {
    getStations
}