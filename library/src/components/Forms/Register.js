import './forms.css';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  validateEmail,
  validatePassword,
  validateReenteredPassword,
  validateUsername,
} from './userValidator';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [termsAgreement, setTermsAgreement] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [reenteredPasswordError, setReenteredPasswordError] = useState('');

  const handleUsernameInput = (value) => {
    validateUsername(value, setUsernameError);
    setUsername(value);
  };

  const handleEmailInput = (value) => {
    validateEmail(value, setEmailError);
    setEmail(value);
  };

  const handlePasswordInput = (value) => {
    validatePassword(value, setPasswordError);
    setPassword(value);
  };

  const handleReenteredPasswordInput = (value) => {
    validateReenteredPassword(value, password, setReenteredPasswordError);
    setReenteredPassword(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/forms.png)` }} className="form-wrapper-outer">
      <div className="form-wrapper-inner">
        <Form onSubmit={handleFormSubmit}>
          <h3>Register</h3>
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

          <Form.Group controlId="formBasicEmail" className={emailError ? 'red' : ''}>
            <Form.Label>
              {`Email${emailError}`}
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => handleEmailInput(e.target.value)}
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
              value={password}
              onChange={(e) => handlePasswordInput(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className={reenteredPasswordError ? 'red' : ''}>
            <Form.Label>
              {`Password${reenteredPasswordError}`}
            </Form.Label>
            <Form.Control
              type="password"
              name="reenteredPassword"
              placeholder="Confirm Password"
              value={reenteredPassword}
              onChange={(e) => handleReenteredPasswordInput(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox2">
            <Form.Check
              name="terms"
              type="checkbox"
              label="Agree to our"
              value={termsAgreement}
              onChange={() => setTermsAgreement(!termsAgreement)}
            />
            <Link className="form-link" to="/termsAndPolicy"> Terms and Privacy Policy</Link>
          </Form.Group>

          <Form.Group>
            <Button
              type="submit"
              className="btn btn-dark btn-lg btn-block"
            >
              Register
            </Button>
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox2">
            <Link className="form-link center" to="/login">
              Already have an account? Login here
            </Link>
          </Form.Group>

        </Form>
      </div>
    </div>

  );
};

export default Register;
