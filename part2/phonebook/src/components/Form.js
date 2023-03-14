const Form = ({ addPerson, person, handleName,handleNumber}) => {
    return (
        <form onSubmit = {addPerson}>
        <div>name: <input value={person.name} onChange={handleName}/> </div>
        <div>number: <input value={person.number} onChange={handleNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }
  
  export default Form

