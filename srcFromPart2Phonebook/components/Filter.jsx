const Filter = ({newFilter, handleFilterChange, addFilter}) => {
  return (
    <form onSubmit={addFilter}>
    Filter shown with: 
    <input
      value={newFilter}
      onChange={handleFilterChange}
    />
    <div>
      <button type="submit">filter</button>
    </div>
    </form>
  )
}
export default Filter
