import { Container } from "react-bootstrap"
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
} from 'mdb-react-ui-kit'

export const TreeUpdate = (props) => {
  return (
    <li>
      <MDBCard className="mx-auto" style={{ maxWidth: '700px', borderRadius: '1em', marginBottom: '2em' }}>
      <MDBCardBody>
      <h2>{props.user}</h2>
      <p>{new Date(props.date).toDateString()}</p>
      <p>{props.text}</p>
      <MDBCardImage style={{maxWidth: '500px', borderRadius:'1em' }} src={props.img} alt='' />
      </MDBCardBody>
      </MDBCard>
    </li>
  )
}