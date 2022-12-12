import { Card, Row, Col } from "react-bootstrap"
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit'
import "../styles/TreeCard.css"

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

export const TreeCard = (props) => {

  const date = new Date(props.date)

  console.log("Called TreeCard")

  return (
    <div id="tree-card-container">
    {/* <Row>
      <a href={`/treelist/${props.id}`}>
      <Col className="m-3">
        <img style={{height: '200px', width: '300px'}} src={props.img} alt='' />
      </Col>
      <Col className="m-3">
        <h3>{props.name}, {props.numPlanted}</h3>
        <h4>Planted by {props.user}</h4>
        <h4>Planted on {date.toDateString()}</h4>
        <img src={`https://maps.googleapis.com/maps/api/staticmap?center=${props.location.latitude},${props.location.longitude}&format=gif&zoom=${14}&size=300x100&markers=color:red%7C${props.location.latitude},${props.location.longitude}&key=${GOOGLE_API_KEY}`} alt='' />
      </Col>
      </a>
    </Row> */}
    <MDBCard id="tree-card" className="mx-auto" style={{ maxWidth: '600px', backgroundColor: '#fff', borderRadius: '1em', marginBottom: '2em' }}>
    <a href={`/treelist/${props.id}`}>
    <MDBRow className='g-0'>
      <MDBCol md='4'>
        <MDBCardImage id="tree-card-image" src={props.img} alt='...' fluid />
      </MDBCol>
      <MDBCol md='8'>
        <MDBCardBody>
          <MDBCardTitle className="text-start" style={{ color: 'black' }} id="tree-card-title">{props.name}, {props.numPlanted}</MDBCardTitle>
          <MDBCardText className="text-start tree-card-info-text">
            Planted by {props.user}
          </MDBCardText>
          <MDBCardText className="text-start tree-card-info-text">
            Planted on {date.toDateString()}
          </MDBCardText>
          <img id="tree-card-google-map" src={`https://maps.googleapis.com/maps/api/staticmap?center=${props.location.latitude},${props.location.longitude}&format=gif&zoom=${12}&size=300x100&markers=color:red%7C${props.location.latitude},${props.location.longitude}&key=${GOOGLE_API_KEY}`} alt='' />
          <MDBCardText id="tree-card-latitude-text">
            <small className='text-muted'>Latitude: {props.location.latitude}</small>
          </MDBCardText>
          <MDBCardText>
            <small className='text-muted'>Longitude: {props.location.longitude}</small>
          </MDBCardText>
        </MDBCardBody>
      </MDBCol>
    </MDBRow>
    </a>
  </MDBCard>
  </div>
  )
}