import { Container } from "react-bootstrap"
import logo from '../images/logo/logo.svg'
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
      
      {
        props.user ?
        <div className="sign-in-status-container">
          <p className="sign-in-status">Signed in as {props.user.userName}</p>
          <MDBBtn onClick={handleLogout} href="/" size='lg' className='me-2 btn-danger topnav-logout' active>Log out</MDBBtn>
        </div>
        :
        <div className="sign-in-topnav">
        <MDBBtn href="/login" size='lg' className='me-2 btn-success' active>
          Sign in
        </MDBBtn>
        <MDBBtn href="/register" size='lg' tag='a' color='secondary' active>
          Register
        </MDBBtn>
        </div>
      }
      
    </Container>
  )
}