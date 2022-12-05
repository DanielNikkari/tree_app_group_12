import { useState, useEffect } from "react"
import { Col, Container, Form } from "react-bootstrap"
import file from "../images/test_img.jpg"
import { MDBInput } from "mdb-react-ui-kit"
import { TreeCard } from "./TreeCard"
import apiService from "../services/apiService"

export const TreeList = () => {
  const [searchValue, setSearchValue] = useState("")
  const [treeList, setTreeList] = useState([])

  console.log("Called TreeList")

  // const treeList = [
  //   {
  //     name: "Silver Birch",
  //     numPlanted: 25,
  //     user: "Jane Doe",
  //     location: {
  //       latitude: 60.21593476277147,
  //       longitude: 24.831096655647787,
  //     },
  //     img: file,
  //   },
  //   {
  //     name: "Silver Birch",
  //     numPlanted: 12,
  //     user: "John Doe",
  //     location: {
  //       latitude: 19.21593476277147,
  //       longitude: 29.831096655647787,
  //     },
  //     img: file,
  //   },
  //   {
  //     name: "Californian Palm",
  //     numPlanted: 40,
  //     user: "Unnamed",
  //     location: {
  //       latitude: 36.21593476277147,
  //       longitude: -119.831096655647787,
  //     },
  //     img: file,
  //   },
  //   {
  //     name: "Californian Palm",
  //     numPlanted: 56,
  //     user: "Naomi Weston",
  //     location: {
  //       latitude: 33.21593476277147,
  //       longitude: 117.831096655647787,
  //     },
  //     img: file,
  //   },
  // ]

  useEffect(() => {
    apiService.getAll().then((data) => {
      console.log(data)
      console.log(data.length)
      setTreeList(data)
    })
  }, [])

    const treesToShow =
    searchValue === ""
      ? treeList
      : treeList.filter((tree) => {
          const toSearch = tree.user + " " + tree.name
          console.log(toSearch)
          const index1 = toSearch
            .toLowerCase()
            .indexOf(searchValue.toLocaleLowerCase())
          if (index1 === -1) {
            return false
          } else {
            return true
          }
        })

  
  const handleSearch = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setSearchValue(event.target.value)
  }

  const _arrayBufferToBase64 = ( buffer ) => {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  return(
    <Container>
      <Col>
      <MDBInput value={searchValue} wrapperClass='mb-4 m-3' label='search' id='' type='text' size="" onChange={handleSearch} />
 
        <ul>
        {treesToShow.map((tree, index) => {
          // const base64string = btoa(String.fromCharCode(...new Uint8Array(tree.image.data.data)).reduce((data, byte) => data + String.fromCharCode(byte), ''))
          const base64string = _arrayBufferToBase64(tree.image.data.data)
          return <TreeCard key={index} id={tree.id} name={tree.name} numPlanted={tree.numberPlanted} user={tree.user} location={tree.location} date={tree.createdAt} img={`data:image/${tree.image.contentType};base64,${base64string}`} />
        })}
        </ul>
      </Col>
      {/* img={`data:image/${tree.image.contentType};base64,${base64string}`} */}
    </Container>
  )
}