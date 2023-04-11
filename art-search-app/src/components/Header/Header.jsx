import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar className='navbar-expand-md navbar-dark bg-danger px-3'>
        <NavbarBrand href="/">ArtSearch</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
            <Link to={"/"} style={{textDecoration: 'none'}}><NavLink>Home</NavLink></Link>
            </NavItem>
            <NavItem>
            <Link to={"/search"} style={{textDecoration: 'none'}}><NavLink>Search</NavLink></Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;