const express = require('express')
const app = express()

app.use(express.json())

app.use(express.static('dist')) // to create static render for dist, on the server

const cors = require('cors')
app.use(cors()) // added for same origin policy

//middleware morgan does the same
// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method)
//   console.log('Path:  ', request.path)
//   console.log('Body:  ', request.body)
//   console.log('---')
//   next()
// }
// app.use(requestLogger)

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
// app.use(morgan('dev'))



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
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  const currentDateTime = new Date();
  response.send(
    `
    <p>Phonebook has info for ${persons.length} people</p>
    <br/>
    <p>${currentDateTime}</p>
    `
  )
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  console.log("Deleted id: ", id );  
  response.status(204).end()
})

// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(n => Number(n.id)))
//     : 0
//   console.log("id created", maxId);  
//   return String(maxId + 1)
// }

const generateId =() => {
  let randomId = Math.floor(Math.random() * 10000)
  while (persons.some(person => person.id === String(randomId))){
    randomId = Math.floor(Math.random() * 10000)
  }
  return String(randomId)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name  || !body.number) {
    return response.status(400).json({
      error: 'name/number missing'
    })
  }

  const exists = persons.filter(person => person.name === body.name)
  if (exists.length > 0) {
    return response.status(400).json({
      error: 'name must be unique' 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  console.log("POSTED: ", person);
  response.json(person)
})

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})