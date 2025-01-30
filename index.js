const express = require('express')
const morgan =  require('morgan')
const cors =    require('cors')
const path =    require('path')
const fs =      require('fs')
const uuid =    require('uuid')
const app =     express()
const baseUrl = 'http://localhost:3001/'


let phonebook = [
    { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use('/static', express.static(path.join(__dirname, 'dist')))

app.use(cors())


    morgan.token('id', function getId(req) {
        return req.id
    })
    
    const printToConsole = (msg) => {
        console.log(msg)
    }
    const assignId = (req, res, next) => {
        req.id = uuid.v4()
        console.log(req.id)
        next()
    }    
    app.use(assignId)
    app.use(morgan('common', {stream: {write: printToConsole}}))
    
    
    
    app.get('/', (request, response )=> {
        console.log('ola')
    response.send('hola')
})

app
.delete('/api/phonebook/:id', (request, response) => {
    const id = request.params.id
    phonebook = phonebook.filter(note => note.id !== id)
    response.status(204).end()
})

app 
.post('/api/persons', express.json(), (req, res) => {
    const body = req.body
    const alreadyOnList = phonebook.find(item => item.name === body.name)
    if (!body.name || !body.number) {
        return res.status(404).json({
            error: 'content missing'
        })
    } else if (alreadyOnList) {
        return res.status(404).json({
            error: `${body.name} is already added`
        })
    } else {
        const person = {
            "id": String(Math.max(...phonebook.map(n => Number(n.id))) + 1),
            "name": body.name,
            "number": String(body.number)
        }
        phonebook = phonebook.concat(person)

        res.json(person)

    }
})

app 
.get('/api/person/:id', (req, res) => {
    const id = req.params.id
    const person = phonebook.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(204).end()
    }
})
app 
.get('/api/phonebook/info', (req, res) => {
    res.send(`Phonebook has info for ${phonebook.length} persons
        <br/> 
        ${new Date()}`)
})
app 
.get('/api/phonebook', (request, response) => {
    response.json(phonebook)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})