const Filter = ({ filter,handleFilter }) => {
    return (
        <div>Filter by name <input value={filter} onChange={handleFilter} /> </div>
    )
  }
  
  export default Filter