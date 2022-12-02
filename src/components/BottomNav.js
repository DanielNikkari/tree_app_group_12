import { Container } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/free-solid-svg-icons'

export const BottomNav = () => {
  return (
    <Container>
      <nav className="navbar fixed-bottom navbar-light bg-light">
        <ul className="navbar-nav d-flex flex-row me-0 justify-content-between w-100">
        <li className="nav-item m-3 me-lg-0">
          <a href="/" className="navbar-brand" ><i className="fa fa-home"></i></a>
        </li>
        <li className="nav-item m-3 me-lg-0">
          <a href="/treeregister" className="navbar-brand" ><i className="fa fa-plus"></i></a>
        </li>
        <li className="nav-item m-3 me-lg-0">
          <a href="/treelist" className="navbar-brand" ><i className="fa fa-list"></i></a>
        </li>
        <li className="nav-item m-3 me-lg-0">
          <a href="/" className="navbar-brand" ><i className="fa fa-user"></i></a>
        </li>
        </ul>
      </nav>
    </Container>
  )
}