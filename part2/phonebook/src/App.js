import { useState } from 'react'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,
      number: '088-33-33'
    }
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    }
  
    //check to see if person name added already exists and add data it doesn't
    if (!persons.find( (person) => person.name === personObject.name)){
      setPersons(persons.concat(personObject));
      setPersons(persons.concat(personObject));
      setNewName('');    
      setNewNumber(''); 
    }
    else
      alert(`${newName} is already added to phonebook`);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit = {addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange} /> </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        <ul>
          { persons.map(person =>
            <Person key={person.number} person={person} />
          )}
        </ul>
      </ul>
    </div>
  )
}

export default App;