import React, {useState} from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom'
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
              <RouterNavLink to={"/"} style={{textDecoration: 'none'}}>
                <NavLink>Home</NavLink>
              </RouterNavLink>
            </NavItem>
            <NavItem>
              <RouterNavLink to={"/search"} style={{textDecoration: 'none'}}>
                <NavLink>Search</NavLink>
              </RouterNavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Header;