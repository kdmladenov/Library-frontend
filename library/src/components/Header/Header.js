import { NavLink, useHistory } from 'react-router-dom';
import './Header.css';
import {
  Navbar,
  // Button,
  NavDropdown,
  Nav,
  // Form,
  // FormControl,
} from "react-bootstrap";
import {
  useContext, useEffect, useState,
} from 'react';
import AuthContext, { getToken, getUser } from '../../providers/AuthContext';
import { BASE_URL } from '../../common/constants';
import Search from '../Search/Search';

const Header = () => {
  const { isLoggedIn, setAuthValue } = useContext(AuthContext);
  const [user, setUser] = useState({
    username: '',
    avatar: 'storage/avatars/defaultAvatar.png',
  });
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      fetch(`${BASE_URL}/users/${getUser().userId}/avatar`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.status);
          }
          return res.json();
        })
        .then(res => {
          setUser({ ...user, ...res });
        })
        .catch(err => {
          if (err.message.startsWith('5')) {
            history.push('/serviceUnavailable');
          }
          if (err.message === '404') {
            history.push('*');
          }
        });
    }
  }, [isLoggedIn]);

  const logout = () => {
    fetch(`${BASE_URL}/auth/logout`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then(res => res.json())
      .then(() => {
        setUser({
          username: '',
          avatar: 'storage/avatars/defaultAvatar.png',
        });
        setAuthValue({
          user: null,
          isLoggedIn: false,
        });
        history.push('/logout');
        localStorage.removeItem('token');
      });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
      <NavLink className="logo" to="/home" style={{ backgroundImage: `url(${BASE_URL}/storage/icons/logo.png)` }} />
      {isLoggedIn ? <Search /> : null}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {isLoggedIn && getUser().role === 'admin' && <NavLink to="/users" className="nav-link" role="button">USERS</NavLink>}
          <NavLink to="/books" className="nav-link" role="button">BOOKS</NavLink>
          <NavLink to="/about" className="nav-link" role="button">ABOUT</NavLink>
          <NavLink to="/contacts" className="nav-link" role="button">CONTACT</NavLink>
          {isLoggedIn
            ? (
              <>
                <NavDropdown
                  title={(
                    <>
                      <div className="nav-bar-avatar" style={{ backgroundImage: `url(${BASE_URL}/${user.avatar})`, color: "transparent" }} />
                      <div className="nav-bar-username">{user.username}</div>
                    </>
                  )}
                  id="basic-nav-dropdown"
                  disabled={false}
                >
                  <NavDropdown.Item href="/user">Account</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/logout" onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            )
            : (
              <>
                <NavLink to="/login" className="nav-link">LOGIN</NavLink>
                <NavLink to="/register" className="nav-link">REGISTER</NavLink>
              </>
            )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
