const Numbers = ({ showAllBtn, peopleToShow, deleteBtn }) => {
  return(
    <>
      <button onClick={showAllBtn}>Show All</button>
      <ul>
        {peopleToShow.map ((person) => {
          return (
            <li key={person.id}>{person.name}: {person.number}
              <br />
              <button onClick={() => deleteBtn(person.id)}> delete</button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
export default Numbers