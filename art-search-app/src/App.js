import './App.css';
import React from 'react';
// import { Button } from 'reactstrap';
// import styled from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Detail from './pages/Detail/Detail';
import Search from './pages/Search/Search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>Home</Route>
        <Route path="/detail/:objectID" element={<Detail />}>Detail</Route>
        <Route path="/search" element={<Search />}>Search</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
