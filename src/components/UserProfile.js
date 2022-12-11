import { useEffect, useState } from "react"
import { Container } from "react-bootstrap";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import apiService from "../services/apiService";
import { TopNav } from "./TopNav";

export const UserProfile = (props) => {
  const [user, setUser] = useState(null)
  const [userTrees, setUserTrees] = useState([])
  
  let totalTreesPlanted = 0

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      console.log(foundUser)
      setUser(foundUser) 
    }
  }, [])
  
  useEffect(() => {
    if (user) {
      apiService.getAllWithId(user.userId).then(response => {
        console.log("getting all")
        setUserTrees(response)
      })
    }
  }, [user])

  const _arrayBufferToBase64 = ( buffer ) => {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  return (
    <Container>
      <TopNav user={user} />
      {
        user ?
      <div>
      <p>Name</p>
      <h1>{user.userName}</h1>
      <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>Species</th>
          <th scope='col'>Location</th>
          <th scope='col'>Number planted</th>
          <th scope='col'>Planted on</th>
          <th scope='col'>Link</th>
          {/* <th scope='col'>Actions</th> */}
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {userTrees.map((tree, index) => {
          totalTreesPlanted += Number(tree.numberPlanted)
          return (<tr key={index}>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src={`data:image/${tree.image.contentType};base64,${_arrayBufferToBase64(tree.image.data.data)}`}
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{tree.name}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='text-muted mb-1'>Latitude: {tree.location.latitude}</p>
            <p className='text-muted mb-0'>Longitude: {tree.location.longitude}</p>
          </td>
          <td>
            <MDBBadge color='success' pill>
              {tree.numberPlanted}
            </MDBBadge>
          </td>
          <td>{new Date(tree.createdAt).toDateString()}</td>
          <td>
            <MDBBtn href={`/treelist/${tree.id}`} color='link' rounded size='sm'>
              Check out
            </MDBBtn>
          </td>
        </tr>)
        })}
      </MDBTableBody>
    </MDBTable>
    <h3 style={{ 'marginBottom':'150px' }}>{totalTreesPlanted} trees planted in total</h3>
    </div>
        :
        <h1>Sign in to see your profile page</h1>
      }
      
    </Container>
  )
}