const express = require('express')
const logger = require('morgan')
const path = require('path')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index.js'))
app.use('/setupapp/Yamaha/asp/BrowseXML', require('./routes/vtuner.js'))

module.exports = app;