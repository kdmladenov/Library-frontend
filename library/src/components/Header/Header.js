import { NavLink } from 'react-router-dom';
import './Header.css';
import {
  Navbar,
  Button,
  NavDropdown,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link><NavLink to="/home">Home</NavLink></Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Nav className="mr-auto">
          <NavDropdown title="USERNAME" id="basic-nav-dropdown">

            <NavDropdown.Item href="#action/3.1">
              <NavLink to="/user/timeline">Timeline</NavLink>
            </NavDropdown.Item>

            <NavDropdown.Item href="#action/3.2">
              <NavLink to="/user/profile">Profile</NavLink>
            </NavDropdown.Item>

            <NavDropdown.Item href="#action/3.3">
              <NavLink to="/user/changePassword">Change Password</NavLink>
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>

          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
