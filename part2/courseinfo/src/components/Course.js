const Total = ({parts}) => {
    return parts.reduce((accumulator,currentValue) => accumulator + currentValue.exercises, 0);
  }
  
  
  const Course = ({course}) => {
      return (
        <div>
          <h1>{course.name}</h1>
            {course.parts.map(part => <p key = {part.name}>{part.name} {part.exercises}</p>)} 
            <p><strong>Total of <Total parts={course.parts} /> exercises</strong></p>
        </div>
    )
  }
  
  export default Course;