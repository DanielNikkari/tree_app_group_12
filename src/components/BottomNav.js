import { Container } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import homeIcon from "../images/icons/Home2.svg"
import listIcon from "../images/icons/List2.svg"
import homeIcon_light from "../images/icons/Home_light2.svg"
import listIcon_light from "../images/icons/List_light2.svg"
import registerIcon from "../images/icons/Register2.svg"
import registerIcon_light from "../images/icons/Register_light2.svg"
import profileIcon from "../images/icons/Profile2.svg"
import profileIcon_light from "../images/icons/Profile_light2.svg"


export const BottomNav = () => {
  const pathname = window.location.pathname

  // {/* <a href="/" className="navbar-brand" ><i className="fa fa-lg fa-home" style={{color: 'grey'}}></i></a> */}
  // {/* <a href="/" className="navbar-brand" ><i className="fa fa-lg fa-home" style={{color: 'green'}}></i></a> */}

  return (
    <Container>
      <nav className="navbar fixed-bottom navbar-light bg-light">
        <ul className="navbar-nav d-flex flex-row me-0 justify-content-between w-100">
        <li className="nav-item m-3 me-lg-0">
          { pathname === "/" ?
          <div>
            <a href="/" className="navbar-brand"><img style={{ height:'60px' }} src={homeIcon} alt='' /></a>
            </div>
            :
            <a href="/" className="navbar-brand"><img style={{ height:'60px' }} src={homeIcon_light} alt='' /></a>
          }
        </li>
        <li className="nav-item m-3 me-lg-0">
        { pathname === "/treeregister" ?
        <div>
          <a href="/treeregister" className="navbar-brand" ><img style={{ height:'60px' }} src={registerIcon} alt='' /></a>
          </div>
          :
          <a href="/treeregister" className="navbar-brand" ><img style={{ height:'60px' }} src={registerIcon_light} alt='' /></a>
        }
        </li>
        <li className="nav-item m-3 me-lg-0">
        { pathname.includes("/treelist") ?
          <div>
          <a href="/treelist" className="navbar-brand"><img style={{ height:'60px' }} src={listIcon} alt='' /></a>
          </div>
          :
          <a href="/treelist" className="navbar-brand"><img style={{ height:'60px' }} src={listIcon_light} alt='' /></a>
        }
        </li>
        <li className="nav-item m-3 me-lg-0">
        { pathname === "/userprofile" ?
        <div>
          <a href="/userprofile" className="navbar-brand" ><img style={{ height:'60px' }} src={profileIcon} alt='' /></a>
          </div>
          :
          <a href="/userprofile" className="navbar-brand" ><img style={{ height:'60px' }} src={profileIcon_light} alt='' /></a>
        }
        </li>
        </ul>
      </nav>
    </Container>
  )
}