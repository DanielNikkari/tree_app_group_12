import { Container, Form } from "react-bootstrap"
import { useState, useEffect } from "react"
import { MDBTextArea, MDBCard, MDBCardBody, MDBBtn } from "mdb-react-ui-kit"
import apiService from "../services/apiService"
import { useParams } from "react-router"
import "../styles/UpdateTree.css"
import xIcon from "../images/icons/x.png"

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
    <Container className="update-tree-container">
      <MDBCard className="mx-auto" id="update-tree-card">
      <MDBCardBody>
      <img id="update-tree-x" onClick={() => props.closeUpdate()} src={xIcon} alt='' />
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
        <MDBBtn style={{ backgroundColor: '#DC965A', color: '#FEFFF0' }} rounded className="btn btn-secondary mt-3" type="submit">Submit</MDBBtn>
        </div>
      </Form>
      </MDBCardBody>
      </MDBCard>
    </Container>
  )
}