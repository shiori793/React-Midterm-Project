import React, {useState, useEffect} from 'react';
import { Form, FormGroup, Label, Input, } from 'reactstrap';
// import styled from 'styled-components';
import List from '../List/List';

function ArtSearch() {

  const [url, setUrl] = useState('https://collectionapi.metmuseum.org/public/collection/v1/search?q=');
  const [query, setQuery] = useState({
    isHighlight: false,
    isOnView: false,
    hasImages: false,
    artistOrCulture: false,
    title: false,
    departmentId: '',
    geoLocation: '',
    q: ''
  });
  const [departments, setDepartments] = useState([]);
  const searchPatterns = [
    'All Fields',
    'Artist / Culture',
    'Title'
  ]

  useEffect(() => {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/departments")
      .then(res => res.json())
      .then(data => {
        setDepartments(data.departments);
      })
  }, [])

  useEffect(() => {
    const defaultUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/search?';
    let newUrl = defaultUrl;
    for (const [key, value] of Object.entries(query)) {
      if (key !== 'q'){
        if(value){
          newUrl += `&${key}=${value}`;
        }
      } else {
        newUrl += `&${key}=${value}`;
      }
    }
    setUrl(newUrl);
  }, [query]);

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    switch (name){
      case 'searchText':
        setQuery(prevValue =>
          ({
              ...prevValue,
              q : value
          })
        );
        break;
      case 'queryPattern':
        setQuery(prevValue =>
          ({
            ...prevValue,
            artistOrCulture: value === '1' ? true : false,
            title: value === '2' ? true : false,
          })
        );
        break;
      case 'department':
        setQuery(prevValue =>
          ({
              ...prevValue,
              departmentId : value
          })
        );
        break;
      case 'geoLocation':
        const newValue = value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
        setQuery(prevValue =>
          ({
              ...prevValue,
              geoLocation : newValue
          })
        );
        break;
      case 'isHighlight':
        setQuery(prevValue =>
          ({
              ...prevValue,
              isHighlight : checked
          })
        );
        break;
      case 'isOnView':
        setQuery(prevValue =>
          ({
              ...prevValue,
              isOnView : checked
          })
        );
        break;
      case 'hasImages':
        setQuery(prevValue =>
          ({
              ...prevValue,
              hasImages : checked
          })
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Form className='container p-3'>
        <FormGroup>
          <Input
            id="searchText"
            name="searchText"
            placeholder="Search (Required)"
            type="text"
            required
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup tag="fieldset">
          {
            searchPatterns.map((value, index) => 
              <FormGroup check inline key={index} className='me-3'>
                <Input
                  name="queryPattern"
                  type="radio"
                  value={index}
                  onChange={handleChange}
                  checked={
                    index === 1 ? query.artistOrCulture
                    : index === 2 ? query.title
                    : !query.artistOrCulture && !query.title
                  }
                />
                <Label check>
                  {value}
                </Label>
              </FormGroup>
            )
          }
        </FormGroup>
        <FormGroup>
          <Input
            id="department"
            name="department"
            type="select"
            onChange={handleChange}
            value={query.departmentId}
          >
            <option value=''>Department</option>
            {
              departments.map(item => 
                <option key={item.departmentId} value={item.departmentId}>
                  {item.displayName}
                </option>
              )
            }
          </Input>
        </FormGroup>
        <FormGroup>
          <Input
            id="geoLocation"
            name="geoLocation"
            placeholder="Geographic Location"
            type="text"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup switch>
          <Input
            type="switch"
            checked={query.isHighlight}
            name='isHighlight'
            onChange={handleChange}
          />
          <Label check>Highlights</Label>
        </FormGroup>
        <FormGroup switch>
          <Input
            type="switch"
            checked={query.isOnView}
            name='isOnView'
            onChange={handleChange}
          />
          <Label check>Artworks on Display</Label>
        </FormGroup>
        <FormGroup switch>
          <Input
            type="switch"
            checked={query.hasImages}
            name='hasImages'
            onChange={handleChange}
          />
          <Label check>Artworks With Image</Label>
        </FormGroup>
      </Form>
      <List url={url} />
    </>
  );
}

export default ArtSearch;