import axios from "axios"
// const baseUrl = "/api/trees"
const baseUrl = "http://localhost:8080/api/trees"

const getAll = () => {
  return axios.get(baseUrl)
}

const getOne = (id) => {
  return axios.get(`baseUrl/${id}`)
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

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj)
  return request
}

export default { getAll, getOne, add, deletePerson, update }
