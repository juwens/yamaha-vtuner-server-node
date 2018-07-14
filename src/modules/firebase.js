const https = require('https')
const config = require('../config')

const url = config.fbUrl + '?auth=' + config.fbSecret;

function getStations() {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = ''
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                let stations = JSON.parse(data)
                resolve(stations)
            });
        })
        .on('error', (err) => {
            reject(err)
        })
    })
}
    
module.exports = {
    getStations
}