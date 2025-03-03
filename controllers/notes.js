const phonebookRouter = require('express').Router()
const Person = require('../models/note')

//Llamadas a /api/notes y json parser
phonebookRouter.get('/', (req, res) => {
    Person.find({}).then(persons =>{
        res.json(persons)
    })
    .catch(error => {
        console.error('Error retreiving notes:', error)
        res.status(500).json({error: 'failed to retrieve notes'})
    })
})

phonebookRouter.post('/', (req, res, next) => {
    const body = req.body
    const person = new Person({
        name: body.name,
        number: body.number
    })
    
    if (body.name === undefined || body.number === undefined) {
        return res.status(400).json({error: 'Content missing'})
    }
    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
    .catch(error => next(error))
})

phonebookRouter.get('/:id', (request, response) => {
    Person.findById(request.params.id)
    .then(person => {
        if (person) {
            response.json(person)
        } else {
            return response.status(404).end()
        }
    })
    .catch(error => {
        next(error)
    })
})

phonebookRouter.delete(':id', (req, res, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => {
        next(error)
    })
})

phonebookRouter.put('/:id', (req, res, next) => {
    const body = req.body
    const person = {
        name: body.name,    
        number: body.number,
    }
    
    Person.findByIdAndUpdate(req.params.id, 
        person,
        { new: true, runValidators: true, context: 'query' })
    .then(updatedNote => {
        response.json(updatedNote)
    })
    .catch(error => next(error))
})

module.exports = phonebookRouter