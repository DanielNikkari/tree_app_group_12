import { Container } from "react-bootstrap"
import { MDBBtn } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { TopNav } from "./TopNav"
import "../styles/Home.css"

export const Home = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser)
      setUser(foundUser);
    }
  }, [])

  const handleLogin = (event) => {
    setTimeout(() => {
      navigate('/login', { replace: true })
    }, 500)
  }

  const handleRegister = (event) => {
    setTimeout(() => {
      navigate('/register', { replace: true })
    }, 500)
  }

  const handleLogout = (event) => {
    localStorage.clear()
    setUser(null)
  }

  return (
    <Container>
      <TopNav user={user} />
      {
        user ?
        <div>
        <h1>You're logged in as {user.userName}</h1>
        <MDBBtn rounded id ="log-out" onClick={handleLogout} href="/" size='lg' className='me-2 topnav-logout' active>Log out</MDBBtn>
        </div>
        :
        <div>
        <div className="d-grid gap-2 col-6 mx-auto">
        <MDBBtn rounded id = "sign-in" onClick={handleLogin} className="btn-primary">
          Sign in

        </MDBBtn>
        
        <MDBBtn rounded id= "register" onClick={handleRegister} className="btn-secondary btn-sm">Register</MDBBtn>
        </div>
        <div className="divider align-items-center my-4">
          <p className="text-center fw-bold mx-3 mb-0">OR</p>
        </div>
        <div>
          <MDBBtn rounded id="cont" href="/treeregister" outline className='mx-2' color='secondary'>
            Continue without signing in
          </MDBBtn>
        </div>
        </div>
      }
      
    </Container>
  )
}