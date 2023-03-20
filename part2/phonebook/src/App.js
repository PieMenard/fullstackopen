import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import RenderPeople from './components/RenderPeople'

import personService from './services/persons'

import './style.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [newFilter, setNewFilter] = useState('');
  //a new array that is a copy of persons
  const [personsToShow, setPersonsToShow] = useState(persons);
  
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
        setPersonsToShow(initialPersons);
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    //check to see if person name added already exists and add data it doesn't
    if (!persons.find( (person) => person.name.toLowerCase() === personObject.name.toLowerCase())){
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setPersonsToShow(persons.concat(returnedPerson)); 
       })

       setNotification(`Added ${personObject.name}! `) ;
       setTimeout(() => {setNotification(null)}, 5000);
    }
    else
    {
      //check if new number is different from old number, ask to replace
      if (!persons.find( (person) => person.number === personObject.number))
      {
        window.confirm(`${personObject.name} already exists, replace old number with new one?` );
        {
         updateNumber(personObject.id-1)
        }
      }
      else
        {
          setErrorMessage(`${personObject.name} already exists! `) ;
          setTimeout(() => {setErrorMessage(null)}, 5000);
        }
        
    }
    setNewName('');
    setNewNumber('');
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
    personService
      .destroy(id)
      .then(() => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
        setPersonsToShow(updatedPersons); 
        setNotification(`Deleted ${person.name}! `) ;
        setTimeout(() => {setNotification(null)}, 5000);
       })
       .catch(error => {
        setErrorMessage(`Information of ${person.name} has already been removed from server! `) ;
        setTimeout(() => {setErrorMessage(null)}, 5000);
      })
    }
  }

  const updateNumber = (id) => {
    const person = persons.find(n => n.id === id);
    const changedPerson = { ...person, number: newNumber};
  
    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson));
        setPersonsToShow(persons.map(person => person.id !== id ? person : returnedPerson));
        setNotification(`Updated ${person.name}'s number! `) ;
        setTimeout(() => {setNotification(null)}, 5000);
      })
      .catch(error => {
        setErrorMessage(`Information of ${person.name} has already been removed from server! `) ;
        setTimeout(() => {setErrorMessage(null)}, 5000);
        setPersons(persons.filter(n => n.id !== id));
      })
  }

  //STEP 11, NOTIFICATION FOR SUCCESFUL OPERATION
  const Notification = ({ message }) => {
    if (message === null) {
      return null;
    }
    return (
      <div className='notification'>
        {message}
      </div>
    )
  }

  const ErrorMessage = ({ message }) => {
    if (message === null) {
      return null;
    }
    return (
      <div className='error'>
        {message}
      </div>
    )
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
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} />
      <ErrorMessage message={errorMessage}/>
      <Filter filter = {newFilter} handleFilter = {handleFilterChange} />
      <h2>Add new</h2>
      <Form addPerson = {addPerson} 
            newName = {newName}
            newNumber = {newNumber} 
            handleName = {handleNameChange} 
            handleNumber = {handleNumberChange}/>
      <h2>Numbers</h2>
      <RenderPeople people = {personsToShow} deletePerson = {deletePerson}/>
    </div>
  )
}

export default App;