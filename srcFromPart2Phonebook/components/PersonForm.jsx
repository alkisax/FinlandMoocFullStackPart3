const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handlePhoneChange  }) => {
  return(
    <form onSubmit={addPerson}>
      <div>
        name: 
        <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: 
        <input 
          value={newNumber}
          onChange={handlePhoneChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm