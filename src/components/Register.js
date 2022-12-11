import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react"
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBValidationItem,
  MDBValidation,
}
from 'mdb-react-ui-kit'
import logo from "../images/logo/logo.svg"
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Notification } from './Notifications';
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { TopNav } from './TopNav';

export const Register = (props) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordRetype, setPasswordRetype] = useState("")
  const [popup, setPopup] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser)
      setUser(foundUser);
    }
  }, [])

  const handleRegistering = (event) => {
    event.preventDefault()
    if (passwordCompare()) {
      const newUser = {
        name: firstName + " " + lastName,
        email: email,
        password: password
      }
      apiService.addUser(newUser).then(response => {
        console.log("response", response)
        navigate('/treeregister', { replace: true })
      })
      .catch(err => {
        console.log(err)
        setPopup(true)
        setMessage("Failed to register user, please try again")
        setError(true)
        setTimeout(() => {
          setMessage(null)
          setPopup(false)
        }, 3000)
      })
    } else {
      // window.alert("The passwords don't match")
      setPopup(true)
      setPasswordRetype("")
      setMessage("Passwords did not match")
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setPopup(false)
      }, 3000)
    }
  }

  const handleFirstName = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastName = (event) => {
    setLastName(event.target.value)
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handlePasswordRetype = (event) => {
    setPasswordRetype(event.target.value)
  }

  const passwordCompare = () => {
    if (password === passwordRetype) {
      return true
    } else {
      return false
    }
  }

  return (
    <Container>
      <TopNav user={user} />
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>

        <MDBCol col='4' md='6' className='mx-auto'>
          <h1 className='mb-5'>Register</h1>
          <MDBValidation className='' isValidated>
          <MDBValidationItem feedback='Please provide your first and last name' invalid className=''>
          <Row className='mb-5'>
            <Col>
              <MDBInput value={firstName} onChange={handleFirstName} required label='Fist name' type='text' />
            </Col>
            <Col>
              <MDBInput value={lastName} onChange={handleLastName} required label='Last name' type='text' />
            </Col>
          </Row>
          </MDBValidationItem>
          <MDBValidationItem feedback='Please provide your email address' invalid className=''>
            <MDBInput value={email} onChange={handleEmail} required wrapperClass='mb-5' label='Email address' type='email' size="lg"/>
          </MDBValidationItem>

          {
            popup === true ?
            <Notification message={message} error={error} /> 
            :
            null
          }
          <MDBValidationItem feedback='' invalid className=''>
            <MDBInput value={password} onChange={handlePassword} required wrapperClass='mb-3' label='Password' type='password' size="lg"/>
          </MDBValidationItem>
          <MDBValidationItem feedback='Please retype the password' invalid className=''>
            <MDBInput value={passwordRetype} onChange={handlePasswordRetype} required wrapperClass='mb-5' label='Retype Password' type='password' size="lg"/>
          </MDBValidationItem>

          <MDBBtn style={{ backgroundColor: '#DC965A', color: '#FEFFF0' }} rounded onClick={handleRegistering} className="mb-4 w-100 btn btn-secondary" size="lg">Register</MDBBtn>
          <MDBBtn style={{ color: '#000' }} rounded href='/login' className="mb-4 w-100 btn btn-secondary" size="lg">Sign in</MDBBtn>

          <div className="divider align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <MDBBtn rounded className="mb-4 w-100" size="lg" style={{backgroundColor: '#d34836'}}>
            <MDBIcon fab icon="google" className="mx-2"/>
            Continue with Google
          </MDBBtn>
          </MDBValidation>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </Container>
  )
}