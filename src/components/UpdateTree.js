import { Container, Form } from "react-bootstrap"
import { useState, useEffect } from "react"
import { MDBTextArea, MDBCard, MDBCardBody, MDBBtn } from "mdb-react-ui-kit"
import apiService from "../services/apiService"
import { useParams } from "react-router"
import "../styles/UpdateTree.css"
import xIcon from "../images/icons/x.png"
import { Notification } from "./Notifications"

export const UpdateTree = (props) => {

  const [file, setFile] = useState({ selectedFile: null })
  const [observations, setObservations] = useState("")
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)
  const [submitting, setSubmitting] = useState(false)

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
      // setMessage("Update added")
      // setError(false)
      setSubmitting(true)
      setTimeout(() => {
        // setMessage(null)
        props.closeUpdate()
      }, 1500)
    })
    .catch(error => {
      console.log("Error with updating tree", error)
      // props.closeUpdate()
      setMessage(error.response.data.error)
      setError(true)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
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
      <Notification message={message} error={error} />
      <MDBCard className="mx-auto" id="update-tree-card">
      <MDBCardBody>
      {
        submitting === false ?
      <div>
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
      </div>
      :
      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
      }
      </MDBCardBody>
      </MDBCard>
    </Container>
  )
}