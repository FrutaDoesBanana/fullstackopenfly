const mongoose = require('mongoose')


const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        required: true
    },
    number: {
        type: String,
        minLength: 9,
        required: true,
        validate: function(v) {
            return /\d{3}-\d{5}/.test(v)
        },
    }
})

//Transformación de las respuestas JSON
personSchema.set('toJSON', {
    transform: (document, returnedDocument) => {
        returnedDocument.id = document._id.toString()
        delete returnedDocument._id
        delete returnedDocument.__v
    }
})

module.exports = mongoose.model('Person', personSchema)