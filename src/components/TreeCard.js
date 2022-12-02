import { Card, Row, Col, ListGroup } from "react-bootstrap"

export const TreeCard = (props) => {
  return (
    <Row>
      <Col className="m-3">
        <img style={{height: '200px', width: '300px'}} src={props.img} alt='' />
      </Col>
      <Col className="m-3">
        <h3>{props.name}, {props.numPlanted}</h3>
        <h4>Planted by {props.user}</h4>
      </Col>
    </Row>
  )
}