//
import { useState, useEffect } from 'react'
// import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import phoneService from './services/phonebook'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  // const hook = () => {
  //   axios
  //     .get(url)
  //     .then (response => {
  //       console.log(response.data)
  //       setPersons(response.data)
  //       // setPersons(response.name)
  //       // setnewNumber(response.number)
  //   })
  // }
  // useEffect(hook, [])

  useEffect(() => {
    phoneService
      .getAll()
      .then(response => {
        setPersons(response.data)
    })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson){
      if (existingPerson.number !== newNumber){
        if(window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)){
          const updatedPerson = { ...existingPerson, number: newNumber }
          phoneService 
            .update(existingPerson.id, updatedPerson)
            .then(response => {
              setPersons(prevPersons =>
                prevPersons.map(person =>
                  person.id !== existingPerson.id ? person : response.data
                )
              );
              setNewName('');
              setNewNumber('');
              setMessage(`${existingPerson.name} phone updated.`)
              setType('green')
              setTimeout (() => {
                setMessage(null)
              }, 3000)
            })
            .catch(error => {
              console.error('Error updating person:', error);
              setMessage(`Information of ${existingPerson.name} has already been removed from server`)
              setType('error')
              setTimeout (() => {
                setMessage(null)
              }, 3000)
            });
        }        
      } else {
      console.log("same name/number");
      alert(`${newName} is already added to phonebook`)
      setMessage(`${newName} already eixsts.`)
      setType('error')
      setTimeout (() => {
        setMessage(null)
      }, 3000)    
      return
      }
    } else {
        const personObj = {
          name: newName,
          number: newNumber
        }
      phoneService
        .create(personObj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${newName}.`)
          setType('green')
          setTimeout (() => {
            setMessage(null)
          }, 3000) 
      })
    }
  }

  const addFilter = (event) => {
    event.preventDefault()
    setFilter(newFilter)
    setNewFilter('')
    setShowAll(false)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value)    
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setNewFilter(event.target.value)    
  }

  const peopleToShow = showAll ?
                       persons :
                       persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const showAllBtn = () => {
    setShowAll(true)
  }

  const deleteBtn =(id) => {
    const tmpName = persons.find(person => person.id === id).name
    if (window.confirm(`Are you sure you want to delete ${tmpName} contact?`)){
          phoneService
      .deleteId(id)
      .then ( () => {
        setPersons(persons.filter( person => person.id !== id))
        setMessage(`${tmpName} removed.`)
        setType('error')
        setTimeout (() => {
          setMessage(null)
        }, 3000) 
      })
      .catch (error => {
        console.error("Already deleted", error);
        setMessage(`${tmpName} Already deleted.`)
        setType('error')
        setTimeout (() => {
          setMessage(null)
        }, 3000) 
      })
    }
  }

  return (
    <div>
      <Message message={message} type={type} />
      <h2>Phonebook</h2>
      <Filter 
        newFilter={newFilter} 
        handleFilterChange={handleFilterChange} 
        addFilter={addFilter} 
      />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />


      <h2>Numbers</h2>
      <Numbers
        deleteBtn={deleteBtn}
        showAllBtn={showAllBtn}
        peopleToShow={peopleToShow}
      />
    </div>
  )
}

export default App