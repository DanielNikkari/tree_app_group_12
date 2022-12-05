import { Container } from "react-bootstrap"
import { MDBBtn } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react"
import { TopNav } from "./TopNav"

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

  return (
    <Container>
      <TopNav user={user} />
      <div className="d-grid gap-2 col-6 mx-auto">
      <MDBBtn onClick={handleLogin} className="btn-success btn-lg">Sign in</MDBBtn>
      <MDBBtn onClick={handleRegister} className="btn-secondary btn-sm">Register</MDBBtn>
    </div>
    <div className="divider align-items-center my-4">
      <p className="text-center fw-bold mx-3 mb-0">OR</p>
    </div>
    <div>
      <MDBBtn href="/treeregister" outline className='mx-2' color='secondary'>
        Continue without signing in
      </MDBBtn>
    </div>
    </Container>
  )
}