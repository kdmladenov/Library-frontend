import { NavLink, useHistory } from 'react-router-dom';
import './Header.css';
import {
  Navbar,
  Button,
  NavDropdown,
  Nav,
  Form,
  FormControl,
} from "react-bootstrap";
import { useContext } from 'react';
import AuthContext, { getToken } from '../../providers/AuthContext';
import { BASE_URL } from '../../common/constants';

const Header = () => {
  const { isLoggedIn, setAuthValue } = useContext(AuthContext);
  const token = getToken();
  const history = useHistory();

  const logout = () => {
    console.log(token);
    fetch(`${BASE_URL}/auth/logout`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(() => {
        localStorage.removeItem('token');
        setAuthValue({
          user: null,
          isLoggedIn: false,
        });
        history.push('/logout');
      });
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/home" className="nav-link" role="button">Home</NavLink>
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
          {isLoggedIn
            ? (
              <>
                <NavDropdown title="USERNAME" id="basic-nav-dropdown">
                  <NavLink to="/user/timeline" className="dropdown-item">Timeline</NavLink>
                  <NavLink to="/user/profile" className="dropdown-item">Profile</NavLink>
                  <NavLink to="/user/changePassword" className="dropdown-item">Change Password</NavLink>
                  <Nav.Link className="dropdown-item" onClick={logout}>Logout</Nav.Link>
                </NavDropdown>
              </>
            )
            : (
              <>
                <NavLink to="/login" className="dropdown-item">Login</NavLink>
                <NavLink to="/register" className="dropdown-item">Register</NavLink>
              </>
            )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
