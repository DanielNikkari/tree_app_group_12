import { Container } from "react-bootstrap"
import { useParams } from "react-router"
import apiService from "../services/apiService"
import { useEffect, useState } from "react"
import Spinner from 'react-bootstrap/Spinner';

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

export const TreeProfile = (props) => {
  const [tree, setTree] = useState(null)
  const [fetching, setFetching] = useState(true)
  const [zoom, setZoom] = useState("12")
  const [location, setLocation] = useState({latitude: "", longitude: ""})

  let { id } = useParams()

  console.log("Called TreeProfile")
  console.log("fetching", fetching)

  useEffect(() => {
    console.log("id", id)
    apiService.getOne(id).then(t => {
      console.log("data", t)
      setTree(t)
      setLocation({latitude: t.location.latitude, longitude: t.location.longitude})
      setFetching(false)
    })
  }, [])
  
  const handleZoomChange2 = (event) => {
    console.log(event.target.value)
    setZoom(event.target.value)
  }
  const test = (event) => {
    console.log(event.target.value)
    setFetching(!fetching)
  }


  if (tree) {
    return (
      <Container className="treeprofile-page">
        {/* <div>
        {
          tree ?
          <div>
          <img style={{height: '200px', width: '300px'}} src={`data:image/${tree.image.contentType};base64,${btoa(String.fromCharCode(...new Uint8Array(tree.image.data.data)))}`} alt='' />
          <h1>{tree.name}</h1>
          <h3>Planted on {new Date(tree.createdAt).toDateString()}</h3>
          <h3>Planted by {tree.user}</h3>
          </div>
          :
          <Spinner animation="border" variant="primary" />
        }
        </div> */}
        
        {/* <h1>{tree.name}</h1>
        {
          fetching === false ?
          <h3>Planted on {new Date(tree.createdAt).toDateString()}</h3>
          :
          null
        }
        <h3>Planted by {tree.user}</h3> */}
  
        {/* {
          fetching === false ?
          <div>
          <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&format=gif&zoom=${zoom}&size=300x200&markers=color:red%7C${location.latitude},${location.longitude}&key=${GOOGLE_API_KEY}`} alt='' />
          </div>
          :
          null
        } */}
        <div>
          <img style={{height: '200px', width: '300px'}} src={`data:image/${tree.image.contentType};base64,${btoa(String.fromCharCode(...new Uint8Array(tree.image.data.data)))}`} alt='' />
          <h1>{tree.name}</h1>
          <h3>Planted on {new Date(tree.createdAt).toDateString()}</h3>
          <h3>Planted by {tree.user}</h3>
          </div>
        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&format=gif&zoom=${zoom}&size=300x200&markers=color:red%7C${location.latitude},${location.longitude}&key=${GOOGLE_API_KEY}`} alt='' />
        <div>
          <input className="m-3" type="range" min="1" max="16" value={zoom} onChange={handleZoomChange2} />
        </div>
  
        <button type="button" className="btn btn-primary" onClick={test} >Add update</button>
        
      </Container>
    )
  } else {
    return (
      <Container>
        <Spinner animation="border" variant="primary" />
      </Container>
    )
  }
  
}