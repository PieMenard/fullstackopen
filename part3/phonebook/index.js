require('dotenv').config()

const express = require("express");
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const Person = require('./models/person')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors());
app.use(express.static('build'))

//create custom morgan token for request.body
morgan.token('body', (req) => JSON.stringify(req.body));

//logs the morgan token along with other info
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
//morgan tiny is a default token
//app.use(morgan('tiny'));
app.use(express.json());

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

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
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

/*const generateId = () => {

  return Math.floor(Math.random() * 100);
}*/

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

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      console.log(`updated ${updatedPerson.name}`);
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint)
// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})



