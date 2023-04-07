import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiFillTwitterSquare, AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import styled from 'styled-components';

const CustomIcon = styled.span`
  svg{
    width: 30px;
    height: auto;
  }
`;

function Footer() {
  return (
    <footer>
      <div className="d-flex flex-column flex-sm-row justify-content-around py-4 px-4 border-top bg-secondary bg-opacity-25">
        <p>&copy; 2023 Company, Inc. All rights reserved.</p>
        <div>
          <p className='ms-3'>Follow Us</p>
          <ul className="list-unstyled d-flex">
            <li className="ms-3">
              <a className="link-dark" href="https://twitter.com/metmuseum">
                <CustomIcon>
                  <AiFillTwitterSquare />
                </CustomIcon>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-dark" href="https://www.facebook.com/metmuseum">
                <CustomIcon>
                  <AiFillFacebook />
                </CustomIcon>
              </a>
            </li>
            <li className="ms-3">
              <a className="link-dark" href="https://www.instagram.com/metmuseum/">
                <CustomIcon>
                  <AiFillInstagram />
                </CustomIcon>
              </a>
            </li>
          </ul>
        </div>
    </div>
    </footer>
  );
}

export default Footer;