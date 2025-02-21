//removed old version and saved in other file
const express = require('express')
const app = express()

app.use(express.json())

app.use(express.static('dist')) // to create static render for dist, on the server

const cors = require('cors')
app.use(cors()) // added for same origin policy

const morgan = require('morgan')

const customMorgan = morgan(function (tokens, req, res) {
  let log =  [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res), 'ms'
  ].join(' ')

  if (req.method === 'POST'){
    log += `${JSON.stringify(req.body)}`
  }
  return log
})
app.use(customMorgan)



//mongoose start here
require('dotenv').config();
const Person = require('./models/person')
//mogoose end here

let persons = [
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

app.get('/', (request, response) => {
  response.send('Hello part 3!')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {

  Person.findById(request.params.id).then(note => {
    response.json(note)
  })
})

app.get('/info', (request, response) => {
  Person.countDocuments({})
  .then(count => {
    const currentDateTime = new Date();
    response.send(
      `
      <p>Phonebook has info for ${count} people</p>
      <br/>
      <p>${count}</p>
      `
    )
  })
})

app.delete('/api/persons/:id', (request, response) => {

  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch (error => {
      console.error(error)
      response.status(500).json({ error: 'server error' })
    }) 
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name  || !body.number) {
    return response.status(400).json({
      error: 'name/number missing'
    })
  }
  
  // Check if the name already exists in MongoDB
  Person.findOne({ name: body.name })
    .then (exists => {
      if (exists) {
        return response.status(400).json({
          error: 'name must be unique'
        })
      }

      const person = new Person({
        name: body.name,
        number: body.number
      })

      console.log("POSTED: ", person);

      return person.save()
    })

  .then(savedPerson => {
    if (!savedPerson) {
      return
    }
    response.json(savedPerson)
  })
  .catch (error => {
        console.error(error)
  response.status(500).json({ error: 'server error' })
  })  
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})