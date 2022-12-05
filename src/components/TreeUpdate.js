import { Container } from "react-bootstrap"

export const TreeUpdate = (props) => {
  return (
    <Container>
      <h3>{props.user}</h3>
      <p>{new Date(props.date).toDateString()}</p>
      <p>{props.text}</p>
      <img style={{height: '200px', width: '300px'}} src={props.img} alt='' />
    </Container>
  )
}