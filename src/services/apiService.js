import axios from "axios"

const baseUrl = "/api/trees"
// const baseUrl = "http://localhost:8080/api/trees"

const getAll = () => {
  const request =  axios.get(baseUrl)
  return request.then(response => response.data)
}

const getUpdates = (id) => {
  console.log(`Path: ${baseUrl}/${id}/getupdates`)
  const req = axios.get(`${baseUrl}/getupdates/${id}`)
  return req.then(response => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const getAllWithId = (id) => {
  const request = axios.get(`${baseUrl}/userProfile/${id}`)
  return request.then(response => response.data)
}

const add = (formData) => {
  return axios({
    method: "post",
    url: baseUrl,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
}

const addUpdate = (formData, id) => {
  console.log(id)
  return axios({
    method: "post",
    url: `${baseUrl}/${id}/update`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
}

const addUser = (newObj) => {
  return axios.post(`${baseUrl}/registeruser`, newObj)
}

const signinUser = (obj) => {
  return axios.post(`${baseUrl}/login`, obj)
}

const getSession = () => {
  const request = axios.get(`${baseUrl}/session`)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj)
  return request
}

export default { getAll, getUpdates, getAllWithId, getOne, add, addUpdate, addUser, signinUser, getSession, deletePerson, update }
