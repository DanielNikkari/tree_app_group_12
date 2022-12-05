import { Card, Row, Col } from "react-bootstrap"

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY

export const TreeCard = (props) => {

  const date = new Date(props.date)

  console.log("Called TreeCard")

  return (
    <Row>
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
    </Row>
  )
}