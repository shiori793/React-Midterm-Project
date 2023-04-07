import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const CustomCard = styled.div`
  transition: transform 0.2s ease;
  &:hover{
    transform: scale(1.1);
    cursor: pointer;
  }
`;

function ListCard({objectID}) {

  const [artData, setArtData] = useState({});
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
      .then(res => res.json())
      .then(
        data => {
          setArtData(data);
        })
  }, []);

  const routeChange = () =>{ 
    const path = `/detail/${objectID}`;
    navigate(path);
  }

  return (
    <CustomCard onClick={routeChange} className='container'>
      <Card
        color="light"
        outline
        className='d-flex flex-column align-items-center'
      >
        {!artData.primaryImageSmall ? 
          <img 
            src="https://img.icons8.com/ios-filled/100/null/no-image-gallery.png"
            width="50%"
            height="300px"
            className='card-image-top'
            style={
              {
                objectFit: "contain"
              }
            }
          />
        :
          <img
            alt="No Image"
            src={artData.primaryImageSmall}
            width="80%"
            height="300px"
            className='card-image-top'
            style={
              {
                objectFit: "contain"
              }
            }
          />
        }
        <CardBody className='w-100'>
          <CardTitle tag="h5">
            {artData.title}
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            {artData.artistDisplayName}
          </CardSubtitle>
          <CardText>
            {artData.period}
          </CardText>
        </CardBody>
      </Card>
    </CustomCard>
  );
}

export default ListCard;