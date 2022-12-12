import { useState, useEffect } from "react"
import "../styles/TreeRegister.css"
import { Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';
import { MDBInput, MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
import apiService from "../services/apiService";
import { Notification } from "./Notifications";
import { TopNav } from "./TopNav";
import { useNavigate } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

export const TreeRegister = (props) => {
  const [treeObject, setTreeObject] = useState({})
  const [newTree, setNewTree] = useState("")
  const [numPlanted, setNumPlanted] = useState("")
  const [location, setLocation] = useState({ latitude: "", longitude: "" })
  const [file, setFile] = useState({ selectedFile: null })
  const [zoom, setZoom] = useState("12")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser)
      setUser(foundUser);
    }
  }, [])

  const addTree = (event) => {
    event.preventDefault()
    console.log("Adding tree")
    console.log(file)
    setSubmitting(true)
    const data = {
      name: newTree,
      numberPlanted: numPlanted,
      location: location,
      image: file,
    }
    setTreeObject(data)
    console.log(JSON.stringify(treeObject))

    let bodyFormData = new FormData();

    bodyFormData.append('name', newTree)
    bodyFormData.append('numberPlanted', numPlanted)
    bodyFormData.append('latitude', location.latitude)
    bodyFormData.append('longitude', location.longitude)
    bodyFormData.append('image', file)
    if (user) {
      bodyFormData.append('userId', user.userId)
      bodyFormData.append('userName', user.userName)
    } else {
      bodyFormData.append('userId', "")
      bodyFormData.append('userName', "Unnamed")
    }

    apiService.add(bodyFormData).then(response => {
      console.log("tree data added succesfully!")
      setNewTree("")
      setNumPlanted("")
      setLocation({ latitude: "", longitude: "" })
      setFile({ selectedFile: null })
      setLoading(false)

      console.log("Response ", response)

      setMessage("Trees logged succesfully")
      setError(false)
      setTimeout(() => {
        setMessage(null)
        navigate(`/treelist/${response.data.id}`, { replace: true })
      }, 2000)
    })
    .catch((error) => {
      console.log("Error:", error)
      // setMessage("Lost connection to server, try again later")
      setMessage(error.response.data.error)
      setSubmitting(false)
      setError(true)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    })
  }

  const handleTreeChange = (event) => {
    // console.log(event.target.value)
    setNewTree(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNumPlanted(event.target.value)
  }

  const getLocation = () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getCoordinates, handleLocationErrors)
    } else {
      setLoading(false)
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
          setLoading(false)
          alert("User denied the request for Geolocation.")
          break;
        case error.POSITION_UNAVAILABLE:
          setLoading(false)
          alert("Location information is unavailable.")
          break;
        case error.TIMEOUT:
          setLoading(false)
          alert("The request to get user location timed out.")
          break;
        case error.UNKNOWN_ERROR:
          setLoading(false)
          alert("An unknown error occurred.")
          break;
        default:
          setLoading(false)
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
    console.log(event.target.files[0])
    setFile(event.target.files[0])
  }

  const handleZoomChange = (event) => {
    setZoom(event.target.value)
  }

  return (
    <Container className="treeregister-page">
      <TopNav user={user} />
      <Row>
      <Col id="tree-register-column">
      <Notification message={message} error={error} />
      <Form onSubmit={addTree} className='mx-auto' style={{ marginTop: '1em' }}>
      <Carousel infiniteLoop={false} swipeable={false} showIndicators={false} showStatus={false} renderArrowNext={(onClickHandler, hasNext, label) => {
        if (hasNext) {
          return <MDBBtn style={{ background: '#71816D', color: '#fff' }} size='lg' rounded type="button" onClick={onClickHandler} title={label}>Next</MDBBtn>
        }
        else {}
       }} 
        showThumbs={false} renderArrowPrev={(onClickHandler, hasNext, label) => hasNext && (<MDBBtn outline style={{ border: '2px solid #71816D', background: 'transparent', color: '#000', display: 'block', marginBottom: '2em' }} rounded type="button" onClick={onClickHandler} title={label}>Previous</MDBBtn>)}>
        <Form.Group className="mb-3" controlId="formBasicInfo">
          {/* <input value={newTree} placeholder="Species" onChange={handleTreeChange} /> */}
          {/* <input value={numPlanted} placeholder="Number planted" onChange={handleNumberChange} /> */}
          <MDBInput value={newTree} wrapperClass='mb-4 m-3' label='Species' id='' type='text' size="" onChange={handleTreeChange} />
          <MDBInput value={numPlanted} wrapperClass='mb-4 m-3' label='Number planted' id='' type='text' size="" onChange={handleNumberChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formLocation">
        <div className="google-map-code ">
          {
            location.latitude && location.longitude ? 
            <img style={{ width: '350px', height: '280px' }} src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&format=gif&zoom=${zoom}&size=350x280&markers=color:red%7C${location.latitude},${location.longitude}&key=${GOOGLE_API_KEY}`} alt='' />
            :
            loading ?
            <Spinner animation="border" variant="secondary" />
            :
            null
          }
          <br />
          <input className="m-3" type="range" min="1" max="16" value={zoom} onChange={handleZoomChange} />
          <Form.Text className="text-muted">
            Slide to zoom in or out
          </Form.Text>
          <MDBInput value={location.latitude} wrapperClass='mb-4 m-3' label='Latitude' id='' type='number' size="" onChange={handleLatitudeChange} />
          <MDBInput value={location.longitude} wrapperClass='mb-4 m-3' label='Longitude' id='' type='number' size="" onChange={handleLongitudeChange} />
          {/* <input value={location.latitude} placeholder="Latitude" onChange={handleLatitudeChange} /> */}
          {/* <input value={location.longitude} placeholder="Longitude" onChange={handleLongitudeChange} /> */}
        </div>
          <MDBBtn rounded outline className='mx-2' color='secondary' type="button" onClick={getLocation} size='lg' >Get Location</MDBBtn>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formInputFile">
        <div>
          <input type="file" accept="image/png, image/jpeg" onChange={onFileChange} />
          <Form.Text className="text-muted">
            accepted file types: png, jpeg
          </Form.Text>
        </div>
        {
          submitting === false ?
          <div>
            <MDBBtn style={{ backgroundColor: '#DC965A', color: '#FEFFF0', marginTop: '5em' }} rounded className="btn btn-primary btn-lg" type="submit">Submit</MDBBtn>
          </div>
          :
          <MDBBtn disabled style={{ backgroundColor: '#DC965A', color: '#FEFFF0', marginTop: '5em' }} rounded className="btn btn-primary btn-lg" type="submit">
            <MDBSpinner size="sm" role='status' tag='span' />
            <span className='visually-hidden'>Loading...</span>
          </MDBBtn>
        }
        
        </Form.Group>
        </Carousel>
        {/* <div>
          <MDBBtn style={{ backgroundColor: '#DC965A', color: '#FEFFF0' }} rounded className="btn btn-primary btn-lg" type="submit">Submit</MDBBtn>
        </div> */}
      </Form>
      </Col>
      </Row>
    </Container>
  )
}