import Person from "./Person";

const RenderPeople = ({ people }) => {
    return (
        <div>
        { people.map(person =>
            <Person key={person.id} person={person} />
        )}
        </div>
    )
  }
  
  export default RenderPeople