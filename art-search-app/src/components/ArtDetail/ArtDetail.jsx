import React, { useState, useEffect } from 'react';

function ArtDetail({objectID}) {

  const [artData, setArtData] = useState({});
  const [constituents, setConstituents] = useState([]);

  useEffect(() => {
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)
      .then(res => res.json())
      .then(
        data => {
          setArtData(data);
          data.constituents !== null && setConstituents(data.constituents[0]);
        })
  }, []);

  return (
    <div className='container'>
      <div className='d-flex flex-column flex-md-row'>
        <div className='col-12 col-md-7 d-flex bg-light justify-content-center px-3 py-5' style={{height: '100vh'}}>
          {!artData.primaryImage ? 
              <img 
                alt="No Image"
                src="https://img.icons8.com/ios-filled/100/null/no-image-gallery.png"
                className='w-25 h-100'
                style={
                  {
                    objectFit: "contain"
                  }
                }
              />
            :
              <img
                alt="No Image"
                src={artData.primaryImage}
                className='w-50 h-100'
                style={
                  {
                    objectFit: "contain"
                  }
                }
              />
            }
        </div>
        <div className='col-12 col-md-5 container d-flex flex-column justify-content-center py-5'>
            <h1 className='py-3' style={{fontFamily: '"Times New Roman", Times, serif'}}>{artData.title}</h1>
            {
              artData.artistDisplayName ?
              <p className='py-0 my-0'>{artData.artistDisplayName} {artData.artistNationality && ', ' + artData.artistNationality}</p>
              :
              constituents.length > 0 &&
                <p className='py-0 my-0'>{constituents.name}</p>
            }
            <p className='py-0 my-0'>{artData.objectDate}</p>
        </div>
      </div>

      <hr></hr>

      <div className='container pt-3 pb-5'>
        <h2 className='pb-3'>ArtWork Detail</h2>
          <div className='container'>
            <p><strong>Title:</strong> {artData.title}</p>
            {
              artData.artistDisplayName ?
                <p><strong>Artist:</strong> {artData.artistDisplayName} {artData.artistDisplayBio && '(' + artData.artistDisplayBio + ')'}</p>
                :
                constituents.length > 0 &&
                  <p><strong>Artist:</strong> {constituents.name}</p>
            }
            {
              artData.period &&
              <p><strong>Period:</strong> {artData.period}</p>
            }
            {
              artData.objectDate &&
                <p><strong>Date:</strong> {artData.objectDate}</p>
            }
            {
              artData.culture && 
                <p><strong>Culture:</strong> {artData.culture}</p>
            }
            {
              artData.medium &&
                <p><strong>Medium:</strong> {artData.medium}</p>
            }
            {
              artData.dimensions &&
                <p><strong>Dimensions:</strong> {artData.dimensions}</p>
            }
            {
              artData.objectName &&
                <p><strong>Classification:</strong> {artData.objectName}</p>
            }
            {
              artData.creditLine &&
                <p><strong>Credit Line:</strong> {artData.creditLine}</p>
            }
            {
              artData.accessionNumber &&
                <p><strong>Accession Number:</strong> {artData.accessionNumber}</p>
            }
          </div>
      </div>
    </div>
  );
}

export default ArtDetail;