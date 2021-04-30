import './forms.css';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import userValidator from './userValidator';
import { userInput } from '../../common/constants';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [usernameIsValid, toggleUsernameIsValid] = useState(true);
  const [usernameError, setUsernameError] = useState('');
  const [passwordIsValid, togglePasswordIsValid] = useState(true);
  const [passwordError, setPasswordError] = useState('');

  const handleUsernameInput = (value) => {
    if (userValidator.username(value)) {
      toggleUsernameIsValid(true);
      setUsernameError('');
    } else {
      toggleUsernameIsValid(false);
      setUsernameError(` must be between ${userInput.MIN_USERNAME_LENGTH} and ${userInput.MAX_USERNAME_LENGTH} characters`);
    }
    setUsername(value);
  };

  const handlePasswordInput = (value) => {
    if (!userValidator.password.length(value)) {
      togglePasswordIsValid(false);
      setPasswordError(`must be between ${userInput.MIN_PASSWORD_LENGTH} and ${userInput.MAX_PASSWORD_LENGTH} characters`);
    } else if (!userValidator.password.lowerCase(value)) {
      togglePasswordIsValid(false);
      setPasswordError(' must include a lowercase letter');
    } else if (!userValidator.password.upperCase(value)) {
      togglePasswordIsValid(false);
      setPasswordError(' must include an uppercase letter');
    } else if (!userValidator.password.digit(value)) {
      togglePasswordIsValid(false);
      setPasswordError(' must include a digit');
    } else {
      togglePasswordIsValid(true);
      setPasswordError('');
    }
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
          <Form.Group controlId="formBasicName" className={usernameIsValid ? '' : 'red'}>
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

          <Form.Group controlId="formBasicPassword" className={passwordIsValid ? '' : 'red'}>
            <Form.Label>
              {`Password${passwordError}`}
            </Form.Label>
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

export default Login;