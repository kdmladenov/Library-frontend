import './forms.css';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { validatePassword, validateUsername } from './userValidator';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameInput = (value) => {
    validateUsername(value, setUsernameError);
    setUsername(value);
  };

  const handlePasswordInput = (value) => {
    validatePassword(value, setPasswordError);
    setPassword(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/forms.png)` }} className="form-wrapper-outer">
      <div className="form-wrapper-inner">
        <Form onSubmit={handleFormSubmit}>
          <h3>Login</h3>
          <Form.Group controlId="formBasicName" className={usernameError ? 'red' : ''}>
            <Form.Label>
              {`Username${usernameError}`}
            </Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => handleUsernameInput(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className={passwordError ? 'red' : ''}>
            <Form.Label>
              {`Password${passwordError}`}
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              autoComplete="off"
              value={password}
              onChange={e => handlePasswordInput(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox1">
            <Form.Check
              name="remember"
              type="checkbox"
              label="Remember me"
              value={remember}
              onChange={() => setRemember(!remember)}
            />
            <p className="forgot-password text-right">
              Forgot Your Password
            </p>
          </Form.Group>

          <Form.Group>
            <Button
              type="submit"
              className="btn btn-dark btn-lg btn-block"
            >
              Login
            </Button>
          </Form.Group>

          <Link className="form-link center" to="/register">
            New here? Create an account
          </Link>

        </Form>
      </div>
    </div>

  );
};

export default Login;
