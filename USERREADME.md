# Phonebook Application

**Run the App:** https://finlandmoocfullstackpart3.onrender.com

**Github source code:** [frontend](https://github.com/alkisax/FinlandMOOCFullStack/tree/master/part2/phonebook) // [backend](https://github.com/alkisax/FinlandMoocFullStackPart3)

**Full README:** https://github.com/alkisax/biasedTarotReactViteNode/blob/main/README.md



This project is a full-stack phonebook application built using React for the frontend and Node.js with Express and MongoDB for the backend. The app allows users to add, update, delete, and filter contacts, ensuring a smooth and user-friendly experience.

---

## Technologies Used

### Frontend
- React
- Bootstrap for styling
- Axios for API requests

### Backend
- Node.js
- Express
- MongoDB with Mongoose ORM
- CORS and Morgan for middleware
- Dotenv for environment variable management

---

## Project Structure

### Frontend
```
/src
├── components
│   ├── Filter.jsx
│   ├── Message.jsx
│   ├── Numbers.jsx
│   ├── PersonForm.jsx
├── services
│   ├── phonebook.js
├── App.jsx
```

### Backend
```
/server
├── models
│   ├── person.js
├── .env
├── index.js
```

---

## How It Works

### 1. Fetching Contacts from the Database

The useEffect hook is used to fetch the contacts stored in the backend:

```jsx
useEffect(() => {
    phoneService
        .getAll()
        .then(response => setPersons(response.data))
        .catch(error => {
            setMessage({ text: error.response.data.error, type: "error" });
        });
}, []);
```

### 2. Adding a New Contact

When a user submits a new contact, we check if the contact already exists. If not, we add it to the database:

```jsx
const addPerson = (event) => {
    event.preventDefault();
    const personObj = { name: newName, number: newNumber };
    
    phoneService.create(personObj)
        .then(response => {
            setPersons(persons.concat(response.data));
            setMessage(`Added ${newName}.`);
        })
        .catch(error => {
            setMessage(error.response.data.error);
        });
};
```

### 3. Updating an Existing Contact

If the name already exists, the user is prompted to update the number:

```jsx
const existingPerson = persons.find(person => person.name === newName);
if (existingPerson) {
    if (window.confirm(`Replace ${newName}'s old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        phoneService.update(existingPerson.id, updatedPerson)
            .then(response => {
                setPersons(persons.map(person => person.id !== existingPerson.id ? person : response.data));
            });
    }
}
```

### 4. Deleting a Contact

The delete function confirms and removes a contact from both the frontend and backend:

```jsx
const deleteBtn = (id) => {
    if (window.confirm(`Are you sure you want to delete this contact?`)) {
        phoneService.deleteId(id)
            .then(() => {
                setPersons(persons.filter(person => person.id !== id));
            });
    }
};
```

### 5. Backend API Implementation

The backend uses Express to handle API requests. Here are the main routes:

- **Get all contacts**:

```js
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => res.json(persons));
});
```

- **Add a new contact**:

```js
app.post('/api/persons', (req, res) => {
    const { name, number } = req.body;
    
    const person = new Person({ name, number });
    person.save().then(savedPerson => res.json(savedPerson));
});
```

- **Delete a contact**:

```js
app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(() => res.status(204).end());
});
```

---

## Conclusion
This project demonstrates how to build a CRUD-based phonebook application using the MERN stack. The React frontend communicates with a Node.js backend, which manages data in MongoDB. Features such as validation, error handling, and filtering enhance user experience.

