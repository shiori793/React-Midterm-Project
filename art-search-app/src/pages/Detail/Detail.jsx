import React from 'react';
import { useParams } from 'react-router-dom';
import Header from "../../components/Header/Header"
import Footer from "../../components/Footer/Footer"
import ArtDetail from "../../components/ArtDetail/ArtDetail"

function Detail() {

  const { objectID } = useParams();

  return (
    <>
      <Header />
      <ArtDetail objectID={objectID}/>
      <Footer />
    </>
  );
}

export default Detail;