import { Container } from "react-bootstrap"
import logo from '../images/logo/logo.svg'
import Form from 'react-bootstrap/Form';
import { MDBBtn } from 'mdb-react-ui-kit';
import apiService from "../services/apiService";
import { useState, useEffect } from "react";
import "../styles/TopNav.css"
import { useNavigate } from 'react-router-dom';

export const TopNav = (props) => {

  const navigate = useNavigate()

  const handleLogout = (event) => {
    localStorage.clear()
    navigate('/', { replace: true })
  }


  return (
    <Container className='App-upper-block'>
      <img className='App-logo' src={logo} alt='' />
      <Form.Text id="myHeader" className="text-muted">TreeHugger</Form.Text>
      
      {
        props.user ?
        <div className="sign-in-status-container">
          <p className="sign-in-status">Signed in as {props.user.userName}</p>
          <MDBBtn rounded id="logout" onClick={handleLogout} href="/" size='lg' className='me-2 topnav-logout' active>Log out</MDBBtn>
        </div>
        :
        <div className="sign-in-topnav">
        <MDBBtn rounded id= "sign-in-btn" href="/login" size='lg' className='me-2 btn-success' active>
          Sign in
        </MDBBtn>
        <MDBBtn rounded id= "rgstr" href="/register" size='lg' tag='a' color='secondary' active>
          Register
        </MDBBtn>
        </div>
      }
      
    </Container>
  )
}