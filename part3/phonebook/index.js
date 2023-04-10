require('dotenv').config()

const express = require("express");
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person')

app.use(cors());
app.use(express.static('build'))

//create custom morgan token for request.body
morgan.token('body', (req) => JSON.stringify(req.body));

//logs the morgan token along with other info
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
//morgan tiny is a default token
//app.use(morgan('tiny'));
app.use(express.json());

/*
//connecting backend to database
const mongoose = require('mongoose')
const password = process.argv[2];

const url =
  `mongodb+srv://piemenard:${password}@fs-phonebook.b6cqw1z.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})*/

////


let persons =   
    [
        { 
          "id": 1,
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": 2,
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": 3,
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": 4,
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
    ]
        
app.get('/', (request, response) => {
  response.send('<h1>phonebook</h1>')
})
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

//FETCH SINGLE PERSON
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {

  return Math.floor(Math.random() * 100);
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId()

  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

/*app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'Error 400: content missing' 
    })
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  }

  if (persons.find((person) => person.name === body.name))
  {
    return response.status(400).json({ 
      error: 'Error 400: that name already exists in the phonebook' 
    })
  }
  persons = persons.concat(newPerson)

  response.json(newPerson)
})*/

app.get('/info', (request, response) => {
  const id = request.params.id

  const total = persons.length;
  console.log(total); 

  response.send(
    `<p>Phonebook has info for ${total} people</p><p>${new Date()}</p>`
  );
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})



