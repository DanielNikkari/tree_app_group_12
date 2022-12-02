import { useState, useEffect, useRef } from "react"
import "../styles/TreeRegister.css"
import { Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

export const TreeRegister = (props) => {
  const [newTree, setNewTree] = useState("")
  const [numPlanted, setNumPlanted] = useState("")
  const [location, setLocation] = useState({ latitude: "", longitude: "" })
  const [file, setFile] = useState({ selectedFile: null })
  const [zoom, setZoom] = useState("12")

  const addTree = (event) => {
    event.preventDefault()
    console.log("Adding tree")
  }

  const handleTreeChange = (event) => {
    console.log(event.target.value)
    setNewTree(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNumPlanted(event.target.value)
  }

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationErrors)
    } else {
      alert("Geolocation is not supported by this browser.")
    }
  }

  const getCoordinates = (position) => {
    console.log(position.coords)
    setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })
  }

  const handleLocationErrors = (error) => {
      switch(error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.")
          break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.")
          break;
        default:
          alert("An unknown error occurred.")
      }
    }

  const handleLatitudeChange = (event) => {
    setLocation({ latitude: event.target.value, longitude: location.longitude })
  }

  const handleLongitudeChange = (event) => {
    setLocation({ latitude: location.latitude, longitude: event.target.value })
  }

  const onFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const handleZoomChange = (event) => {
    setZoom(event.target.value)
  }

  return (
    <div>
      <Row>
      <Col>
      <h3>Logged in as John Doe</h3>
      <Form onSubmit={addTree}>
        <Form.Group className="mb-3" controlId="formBasicInfo">
          <input value={newTree} placeholder="Species" onChange={handleTreeChange} />
          <input value={numPlanted} placeholder="Number planted" onChange={handleNumberChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLocation">
        <div className="google-map-code ">
          {
            location.latitude && location.longitude ? 
            <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&format=gif&zoom=${zoom}&size=400x400&markers=color:red%7C${location.latitude},${location.longitude}&key=${GOOGLE_API_KEY}`} alt='' />
            :
            null
          }
          <br />
          <input value={location.latitude} placeholder="Latitude" onChange={handleLatitudeChange} />
          <input value={location.longitude} placeholder="Longitude" onChange={handleLongitudeChange} />
          <input type="range" min="1" max="16" value={zoom} onChange={handleZoomChange} />
          <Form.Text className="text-muted">
            Zoom in or out
          </Form.Text>
        </div>
        <button className="btn btn-primary" type="button" onClick={getLocation}>Get Location</button>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formInputFile">
        <div>
          <input type="file" accept="image/png, image/jpeg" onChange={onFileChange} />
          <Form.Text className="text-muted">
            accepted file types: png, jpeg
          </Form.Text>
        </div>
        </Form.Group>

        <div>
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
      </Form>
      </Col>
      </Row>
    </div>
  )
}