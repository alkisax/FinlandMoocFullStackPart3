import axios from 'axios'
// const baseUrl = 'http://localhost:3001/persons'
const baseUrl = '/api/notes' // this because they where uploaded as same service on render


const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject)
}

const deleteId = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll, create, update, deleteId 
}