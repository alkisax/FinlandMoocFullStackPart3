const mongoose = require('mongoose')

// πέρνει το pass ως argv με την εντολη node mongo.js pass
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]

// διαχείρηση του username και Password και αν κάνουμε create ή read
let isRead = false;
if (process.argv.length === 3) {
   isRead = true
} 
let isCreate = false
if (process.argv.length > 3) {
  isCreate = true
} 

let name = ''
let number = ''
if (process.argv.length === 4) {
  name = process.argv [3] 
}
if (process.argv.length > 4){
  name = process.argv [3] 
  number = process.argv [4]
} 

// το url to πείρα απο το atlas mongodb εδω βρίσκετε και το όνομα της βάσης μου
const url =
  `mongodb+srv://alkisax:${password}@cluster0.8ioq6.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

// το schema δεν είναι ακριβώς απαραίτητο στα nosql
const phonebookAppSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// με το schema φτιάχνω Model
const Person = mongoose.model('Person', phonebookAppSchema)

//CRUD
//Create
if (isCreate) {
  // το model δρα ως constructor
  const person = new Person({
    name: name,
    number: number,
  })
  // σώζω και κλείνω
  person.save().then(result => {
    console.log('person saved!')
    console.log(person)  
    mongoose.connection.close()
  })
}

//Read
if (isRead) {
  //για να βρώ
  Person.find({}).then(result => {
    console.log("phonebook:");    
    result.forEach(person => {
      console.log(`${person.name}: ${person.number}`)
    })
    mongoose.connection.close()
  })
}



