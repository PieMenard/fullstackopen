const RenderPeople = ({ filter,handleFilter }) => {
    return (
        <div>Filter by name <input value={filter} onChange={handleFilter} /> </div>
    )
  }
  
  export default RenderPeople