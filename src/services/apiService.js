import axios from "axios"
// const baseUrl = "/api/trees"
const baseUrl = "http://localhost:8080/api/trees"

const getAll = () => {
  const request =  axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

// const add = (newObj) => {
//   return axios.post(baseUrl, newObj)
// }

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

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj)
  return request
}

export default { getAll, getOne, add, addUpdate, deletePerson, update }
