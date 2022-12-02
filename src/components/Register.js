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
import exampleLogo from "../images/logo/example_logo.jpg"

export const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
      <MDBCol col='10' md='6'>
          <img src={exampleLogo} className="img-fluid" alt="Logo" />
        </MDBCol>

        <MDBCol col='4' md='6'>
          <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Retype Password' id='formControlLg' type='password' size="lg"/>

          <MDBBtn href='/login' className="mb-4 w-100 btn btn-success" size="lg">Register</MDBBtn>
          <MDBBtn href='/login' className="mb-4 w-100 btn btn-secondary" size="lg">Sign in</MDBBtn>

          <div className="divider d-flex align-items-center my-4">
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