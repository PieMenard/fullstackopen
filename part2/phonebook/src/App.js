import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import RenderPeople from './components/RenderPeople'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [newFilter, setNewFilter] = useState('');
  //a new array that is a copy of persons
  const [personsToShow, setPersonsToShow] = useState(persons);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
  
    //check to see if person name added already exists and add data it doesn't
    if (!persons.find( (person) => person.name === personObject.name)){
      setPersons(persons.concat(personObject));
      setPersonsToShow(persons.concat(personObject));
      setNewName('');    
      setNewNumber(''); 
    }
    else
      alert(`${newName} is already added to phonebook`);
    console.log(persons);
    console.log(personsToShow);

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    const search = event.target.value;
    setNewFilter(search);
    setPersonsToShow (persons.filter( (person) => person.name.toLowerCase().includes(search)));
    console.log(persons);
    console.log(personsToShow);
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter = {newFilter} handleFilter = {handleFilterChange} />
      <h2>Add new</h2>
      <Form addPerson = {addPerson} 
            person = {persons} 
            handleName = {handleNameChange} 
            handleNumber = {handleNumberChange}/>
      <h2>Numbers</h2>
      <RenderPeople people = {personsToShow}/>
    </div>
  )
}

export default App;