const xmlbuilder = require('xmlbuilder')
const _ = require('lodash');
const express = require('express');
const state = require('../modules/state')
const firebase = require('../modules/firebase')

function toXml(stations) {
    const items = _(stations).take(8)
                        .map(x => ({'ItemType': x.Item.ItemType, 'StationName': x.Item.StationName, 'StationUrl': x.Item.StationUrl}))
                        .value()
    const xmlObj = {
        'ListOfItems': {
            'ItemCount': items.length,
            'Item' : items
        }
    }
    const xml = xmlbuilder.create(xmlObj, { encoding: 'utf-8', standalone: 'yes'})
    return xml.end({ pretty: true });
}

async function sendStationsXml(req, res, next) {
    let stations = await firebase.getStations()
    res.send(toXml(stations))
}

const router = express.Router();
router.get('/loginXML.asp', (req, res, next) => {
    // int? token, string mac, string fver, string dlang, int? startitems, int? enditems
    if (req.query.token == 0) {
        res.send('<EncryptedToken>abcdef</EncryptedToken>')
    } else {
        sendStationsXml(req, res, next)
    }
});
router.get('/FavXML.asp', (req, res, next) => sendStationsXml(req, res, next));

module.exports = router