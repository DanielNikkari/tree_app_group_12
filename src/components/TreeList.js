import { useState } from "react"
import { Col, Container, Form } from "react-bootstrap"
import file from "../images/test_img.jpg"
import { MDBInput } from "mdb-react-ui-kit"
import { TreeCard } from "./TreeCard"

export const TreeList = () => {
  const [searchValue, setSearchValue] = useState("")

  const treeList = [
    {
      name: "Silver Birch",
      numPlanted: 25,
      user: "Jane Doe",
      location: {
        latitude: 60.21593476277147,
        longitude: 24.831096655647787,
      },
      img: file,
    },
    {
      name: "Silver Birch",
      numPlanted: 12,
      user: "John Doe",
      location: {
        latitude: 19.21593476277147,
        longitude: 29.831096655647787,
      },
      img: file,
    },
    {
      name: "Californian Palm",
      numPlanted: 40,
      user: "Unnamed",
      location: {
        latitude: 36.21593476277147,
        longitude: -119.831096655647787,
      },
      img: file,
    },
    {
      name: "Californian Palm",
      numPlanted: 56,
      user: "Naomi Weston",
      location: {
        latitude: 33.21593476277147,
        longitude: 117.831096655647787,
      },
      img: file,
    },
  ]

  const treesToShow =
    searchValue === ""
      ? treeList
      : treeList.filter((tree) => {
          const toSearch = tree.user + " " + tree.name
          console.log(toSearch)
          const index1 = toSearch
            .toLowerCase()
            .indexOf(searchValue.toLocaleLowerCase())
          // const index2 = tree.name
          //   .toLowerCase()
          //   .indexOf(searchValue.toLocaleLowerCase())
          if (index1 === -1) {
            return false
          } else {
            return true
          }
        })

  const handleSearch = (event) => {
    setSearchValue(event.target.value)
  }


  return(
    <Container>
      <Col>
        <MDBInput wrapperClass='mb-4 m-3' label='search' id='' type='email' size="" onChange={handleSearch} />
        <ul>
        {treesToShow.map((tree, index) => {
          return <TreeCard key={index} name={tree.name} numPlanted={tree.numPlanted} user={tree.user} location={tree.location} img={tree.img} />
        })}
        </ul>
      </Col>
    </Container>
  )
}