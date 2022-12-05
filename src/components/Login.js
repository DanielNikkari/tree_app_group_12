import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react"
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
}
from 'mdb-react-ui-kit'
import logo from "../images/logo/logo.svg"
import apiService from '../services/apiService';
import { Notification } from './Notifications';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [popup, setPopup] = useState(false)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  const signIn = (event) => {
    event.preventDefault()
    const userInfo = {
      email: email,
      password: password
    }
    apiService.signinUser(userInfo).then(response => {
      console.log("response", response.data)
      setUser(response.data)
      localStorage.setItem('user', JSON.stringify(response.data))
      setPopup(true)
      setMessage("Sign in succesfull")
      setError(false)
      setTimeout(() => {
        setMessage(null)
        setPopup(false)
      }, 1000)
    })
    .catch((err) => {
      if (err.response.data === "wrong email") {
        setPopup(true)
        setMessage("Email not found")
        setError(true)
        setTimeout(() => {
          setMessage(null)
          setPopup(false)
        }, 3000)
      } else if (err.response.data === "wrong password") {
        setPopup(true)
        setMessage("Wrong password")
        setError(true)
        setTimeout(() => {
          setMessage(null)
          setPopup(false)
        }, 3000)
        } else {
        console.log(err)
        setPopup(true)
        setMessage("Email or password is wrong")
        setError(true)
        setTimeout(() => {
          setMessage(null)
          setPopup(false)
        }, 3000)
      }
    })
    redirectUser()
  }

  const redirectUser = () => {
    navigate('/treeregister', { replace: true })
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <MDBContainer fluid className="p-3 my-5">
      {
        popup === true ?
        <Notification message={message} error={error} />
        :
        null
      }
      <MDBRow>

        <MDBCol col='4' md='6' className='mx-auto'>
          <h1>Sign in</h1>
          <MDBInput value={email} onChange={handleEmailChange} wrapperClass='mb-4' label='Email address' type='email' size="lg"/>
          <MDBInput value={password} onChange={handlePasswordChange} wrapperClass='mb-4' label='Password' type='password' size="lg"/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="/login">Forgot password?</a>
          </div>

          <MDBBtn onClick={signIn} className="mb-4 w-100 btn btn-success" size="lg">Sign in</MDBBtn>

          <MDBBtn href='/register' className="mb-4 w-100 btn btn-secondary" size="lg">Register</MDBBtn>

          <div className="divider align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <MDBBtn className="mb-4 w-100" size="lg" style={{backgroundColor: '#d34836'}}>
            <MDBIcon fab icon="google" className="mx-2"/>
            Continue with Google
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}