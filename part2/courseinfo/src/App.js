const Total = ({parts}) => {
  return parts.reduce((accumulator,currentValue) => accumulator + currentValue.exercises, 0);
}


const Course = ({course}) => {
    return (
      <div>
        <h1>{course.name}</h1>

          {course.parts.map(part => <p key = {part.name}>{part.name} {part.exercises}</p>)} 
          <p><strong>Total exercises: <Total parts={course.parts}/></strong></p>

      </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App