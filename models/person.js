const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const url = process.env.MONGODB_URI

console.log('conecting to');
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('Error connecting to MongoDB');    
  })

  const noteSchema = new mongoose.Schema({
    name: String,
    number: String
  })

  noteSchema.set('toJson', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject._v
    }
  })

  module.exports = mongoose.model('person', noteSchema)
