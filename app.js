const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const phonebookRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)



logger.info('connecting to ', config.url)

mongoose.connect(config.url)
    .then(result => logger.info('connected to MongoDB'))
    .catch(error => logger.error('Error to conecting to MongoDB: ', error.message))


    
    app.use(cors())
    app.use(express.static('dist'))
    app.use(express.json())
    app.use(middleware.requestLogger)
    
    app.use('/api/phonebook', phonebookRouter)

    app.use(middleware.unknownEndpoint)
    app.use(middleware.errorHandler)

    module.exports = app