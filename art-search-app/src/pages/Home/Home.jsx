import React, {useState, useEffect} from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
// import styled from 'styled-components';
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import List from "../../components/List/List"

function Home() {

  const [department, setDepartment] = useState(1);

  const URL = `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${department}`;
  const [url, setUrl] = useState(URL);

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/departments")
      .then(res => res.json())
      .then(data => {
        setDepartments(data.departments);
      })
  }, [])

  useEffect(() => {
    setUrl(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${department}`)
  }, [department])

  const handleChange = (event) => {
    setDepartment(event.target.value)
  }

  return (
    <>
      <Header />
      <Form className='w-75 mx-auto my-3'>
        <FormGroup>
          <Label for="department" >
            Department
          </Label>
          <Input
            id="department"
            name="department"
            type="select"
            onChange={handleChange}
            value={department}
          >
            {
              departments.map(item => 
                <option key={item.departmentId} value={item.departmentId}>
                  {item.displayName}
                </option>
              )
            }
          </Input>
        </FormGroup>
      </Form>
      <List url={url}/>
      <Footer />
    </>
  );
}

export default Home;