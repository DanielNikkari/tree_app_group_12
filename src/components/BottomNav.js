import { Container } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/free-solid-svg-icons'

export const BottomNav = () => {
  const pathname = window.location.pathname

  return (
    <Container>
      <nav className="navbar fixed-bottom navbar-light bg-light">
        <ul className="navbar-nav d-flex flex-row me-0 justify-content-between w-100">
        <li className="nav-item m-3 me-lg-0">
          { pathname === "/" ?
            <a href="/" className="navbar-brand" ><i className="fa fa-lg fa-home" style={{color: 'green'}}></i></a>
            :
            <a href="/" className="navbar-brand" ><i className="fa fa-lg fa-home" style={{color: 'grey'}}></i></a>
          }
        </li>
        <li className="nav-item m-3 me-lg-0">
        { pathname === "/treeregister" ?
          <a href="/treeregister" className="navbar-brand" ><i className="fa fa-lg fa-plus" style={{color: 'green'}}></i></a>
          :
          <a href="/treeregister" className="navbar-brand" ><i className="fa fa-lg fa-plus" style={{color: 'grey'}}></i></a>
        }
        </li>
        <li className="nav-item m-3 me-lg-0">
        { pathname === "/treelist" ?
          <a href="/treelist" className="navbar-brand" ><i className="fa fa-lg fa-list" style={{color: 'green'}}></i></a>
          :
          <a href="/treelist" className="navbar-brand" ><i className="fa fa-lg fa-list" style={{color: 'grey'}}></i></a>
        }
        </li>
        <li className="nav-item m-3 me-lg-0">
        { pathname === "/profile" ?
          <a href="/" className="navbar-brand" ><i className="fa fa-lg fa-user" style={{color: 'green'}}></i></a>
          :
          <a href="/" className="navbar-brand" ><i className="fa fa-lg fa-user" style={{color: 'grey'}}></i></a>
        }
        </li>
        </ul>
      </nav>
    </Container>
  )
}