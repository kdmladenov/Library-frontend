import './forms.css';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleUsernameInput = (value) => {
    // validation
    setUsername(value);
  };

  const handlePasswordInput = (value) => {
    // validation
    setPassword(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const navigateToRegister = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/forms.png)` }} className="form-wrapper-outer">
      <div className="form-wrapper-inner">
        <Form onSubmit={handleFormSubmit}>
          <h3>Login</h3>
          <Form.Group controlId="formBasicName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => handleUsernameInput(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            {/* must be at least 6 characters/ must include number, lowercase and uppercase letter */}
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

          <a href="/" className="form-link center" onClick={(e) => navigateToRegister(e)}>
            New here? Create an account
          </a>

        </Form>
      </div>
    </div>

  );
};

export default LoginForm;
