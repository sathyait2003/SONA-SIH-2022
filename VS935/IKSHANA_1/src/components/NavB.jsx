import logo from '../assets/logo.png'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'
import {Link} from "react-router-dom"

export default function NavB() {
  return (
    <div className="BstNav">
      <Navbar bg="dark" variant="dark"
        sticky="top" expand="sm" collapseOnSelect>
        <Navbar.Brand>
          <img src={logo} width="60px" height="60px" />{' '}
        </Navbar.Brand>

        <Navbar.Toggle className="coloring" />
        <Navbar.Collapse className="right-align">
          <Nav>
            <NavDropdown title="Services">
              <NavDropdown.Item as = {Link} to = "/selectresources">Request</NavDropdown.Item>
              <NavDropdown.Item as = {Link} to = "/uploadresources">Upload</NavDropdown.Item>
              <NavDropdown.Item href="https://sahakar-comm-forum.netlify.app/">Communication</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#products/promo">Promo</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as = {Link} to = "/login">Login</Nav.Link>
            <Nav.Link as = {Link} to = "/signup">Register</Nav.Link>
            <Nav.Link as = {Link} to = "/aboutus">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Navbar>
      
    </div>
  );
}

 