import { Container } from "react-bootstrap"
import { useParams } from "react-router"
import apiService from "../services/apiService"
import { useEffect, useState } from "react"
import Spinner from 'react-bootstrap/Spinner'
import { UpdateTree } from "./UpdateTree"
import { TreeUpdate } from "./TreeUpdate"
import "../styles/TreeProfile.css"
import { TopNav } from "./TopNav"
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit'
import backButton from "../images/icons/back-button.png"


const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

export const TreeProfile = (props) => {
  const [tree, setTree] = useState(null)
  const [treeUpdates, setTreeUpdates] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [zoom, setZoom] = useState("12")
  const [location, setLocation] = useState({latitude: "", longitude: ""})
  const [user, setUser] = useState(null)

  let { id } = useParams()

  useEffect(() => {
    console.log("id", id)
    apiService.getOne(id).then(t => {
      console.log("data", t)
      setTree(t)
      setLocation({latitude: t.location.latitude, longitude: t.location.longitude})
      })
    apiService.getUpdates(id).then(tu => {
      console.log("tu", tu)
      setTreeUpdates(tu)
    })
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser)
      setUser(foundUser);
    }
  }, [])
  
  const handleZoomChange2 = (event) => {
    console.log(event.target.value)
    setZoom(event.target.value)
  }
  const openUpdate = (event) => {
    setUpdating(true)
  }

  const closeUpdate = (event) => {
    setUpdating(false)
    apiService.getUpdates(id).then(tu => {
      console.log("tu", tu)
      setTreeUpdates(tu)
    })
  }

  const _arrayBufferToBase64 = ( buffer ) => {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  console.log("treeUpdates", treeUpdates)


  if (tree && treeUpdates) {
    return (
      <Container className="treeprofile-page">
        <TopNav user={user} />
        <a href="/treelist" className="d-flex mt-4 mb-3">
          <img style={{ width: '6em', paddingLeft: '0.5em' }} src={backButton} alt='' />
        </a>
        <MDBCard className="mx-auto shadow-none" style={{ maxWidth: '700px', backgroundColor: 'transparent', borderRadius: '1em', marginBottom: '2em' }}>
        <MDBCardBody>
        <div>
          {/* <img style={{height: '200px', width: '300px'}} src={`data:image/${tree.image.contentType};base64,${_arrayBufferToBase64(tree.image.data.data)}`} alt='' /> */}
          <MDBCardImage src={`data:image/${tree.image.contentType};base64,${_arrayBufferToBase64(tree.image.data.data)}`} position='top' style={{ borderRadius: '1em'}} />
          <h1 className="text-start mt-4">{tree.name}</h1>
          <div className="text-start mb-5">
          <h3>Number planted {tree.numberPlanted}</h3>
          <h3>Planted on {new Date(tree.createdAt).toDateString()}</h3>
          <h3>Planted by {tree.user}</h3>
          </div>
          </div>
          <img style={{ borderRadius: '1em'}} src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&format=gif&zoom=${zoom}&size=300x300&markers=color:red%7C${location.latitude},${location.longitude}&key=${GOOGLE_API_KEY}`} alt='' />
        <div>
          <input className="m-3" type="range" min="1" max="16" value={zoom} onChange={handleZoomChange2} />
        </div>
        </MDBCardBody>
        </MDBCard>
  
        <MDBBtn style={{ backgroundColor: '#DC965A', color: '#FEFFF0' }} rounded type="button" className="btn btn-primary" onClick={openUpdate} >Add update</MDBBtn>

      {
        updating === true ?
        <UpdateTree closeUpdate={closeUpdate} treeId={id} treeName={tree.name} user={"unnamed"} />
        :
        null
      }

      <h2 className="mt-5 mb-4 display-4">Updates</h2>
      <ul style={{ 'listStyle':'none', 'marginBottom':'150px', 'padding':'0' }}>
      {
        treeUpdates.map((treeUpdate, index) => {
          return <TreeUpdate key={index} user={treeUpdate.user} text={treeUpdate.text} img={`data:image/${treeUpdate.image.contentType};base64,${_arrayBufferToBase64(treeUpdate.image.data.data)}`} date={treeUpdate.createdAt} />
        })
      }
      </ul>
        
      </Container>
    )
  } else {
    return (
      <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%,-50%)' }}>
        <Spinner style={{ width: '4rem', height: '4rem' }} className="mt-4" animation="border" variant="secondary" />
      </div>
    )
  }
  
}