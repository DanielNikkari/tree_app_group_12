import { Container, Form } from "react-bootstrap"
import { useState } from "react"
import { MDBTextArea } from "mdb-react-ui-kit"
import apiService from "../services/apiService"
import { useParams } from "react-router"

export const UpdateTree = (props) => {

  const [file, setFile] = useState({ selectedFile: null })
  const [observations, setObservations] = useState("")

  let { id } = useParams()

  const addUpdate = (event) => {
    event.preventDefault()
    let bodyFormData = new FormData()
    bodyFormData.append('treeId', id)
    bodyFormData.append('user', props.user)
    bodyFormData.append('text', observations)
    bodyFormData.append('image', file)

    apiService.addUpdate(bodyFormData, id).then(response => {
      setObservations("")
      setFile({ selectedFile: null })
      console.log("Update data sent")
    })
    .catch(error => {
      console.log("Error with updating tree", error)
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