import { Container, Form } from "react-bootstrap"
import { useState, useEffect } from "react"
import { MDBTextArea } from "mdb-react-ui-kit"
import apiService from "../services/apiService"
import { useParams } from "react-router"

export const UpdateTree = (props) => {

  const [file, setFile] = useState({ selectedFile: null })
  const [observations, setObservations] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser)
      setUser(foundUser);
    }
  }, [])

  let { id } = useParams()

  const addUpdate = (event) => {
    event.preventDefault()
    let bodyFormData = new FormData()
    bodyFormData.append('treeId', id)
    bodyFormData.append('text', observations)
    bodyFormData.append('image', file)
    if (user) {
      bodyFormData.append('userId', user.userId)
      bodyFormData.append('userName', user.userName)
    } else {
      bodyFormData.append('userId', "")
      bodyFormData.append('userName', "Unnamed")
    }

    apiService.addUpdate(bodyFormData, id).then(response => {
      setObservations("")
      setFile({ selectedFile: null })
      console.log("Update data sent")
      props.closeUpdate()
    })
    .catch(error => {
      console.log("Error with updating tree", error)
      props.closeUpdate()
    })
  }

  const onFileChange = (event) => {
    console.log(event.target.files[0])
    setFile(event.target.files[0])
  }

  const handleObservations = (event) => {
    setObservations(event.target.value)
  }

  return (
    <Container>
      <h1>{props.treeName} Update</h1>
      <Form onSubmit={addUpdate}>
        <Form.Group className="mb-3" controlId="formInputFile">
        <div>
          <input type="file" accept="image/png, image/jpeg" onChange={onFileChange} />
          <Form.Text className="text-muted">
            accepted file types: png, jpeg
          </Form.Text>
        </div>
        </Form.Group>
        <Form.Group>
        <MDBTextArea
          label='Observations'
          id='validationTextarea'
          placeholder='Write your observations here'
          required
          onChange={handleObservations}
        />
        </Form.Group>
        <div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </Form>
    </Container>
  )
}