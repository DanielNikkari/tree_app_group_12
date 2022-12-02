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
          <a href="/" className="navbar-brand" ><i class="fa fa-home"></i></a>
        </li>
        <li className="nav-item m-3 me-lg-0">
          <a href="/treeregister" className="navbar-brand" ><i class="fa fa-plus"></i></a>
        </li>
        <li className="nav-item m-3 me-lg-0">
          <a href="/" className="navbar-brand" ><i class="fa fa-list"></i></a>
        </li>
        <li className="nav-item m-3 me-lg-0">
          <a href="/r" className="navbar-brand" ><i class="fa fa-user"></i></a>
        </li>
        </ul>
      </nav>
    </Container>
  )
}