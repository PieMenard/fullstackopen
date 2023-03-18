import Person from "./Person";

const RenderPeople = ({ people, deletePerson }) => {
    return (
        <div>
        { people.map(person =>
            <Person key={person.id} person={person} deletePerson = {deletePerson}/>
        )}
        </div>
    )
  }
  
  export default RenderPeople