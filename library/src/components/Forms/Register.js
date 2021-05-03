import './forms.css';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  validateEmail,
  validatePassword,
  validateReenteredPassword,
  validateUsername,
} from './userValidator';
import { BASE_URL } from '../../common/constants';

const Register = () => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const [termsAgreement, setTermsAgreement] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [reenteredPasswordError, setReenteredPasswordError] = useState('');

  const history = useHistory();

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

  const handleTermsAgreementCheck = () => {
    validateUsername(username, setUsernameError);
    validateEmail(email, setEmailError);
    validatePassword(password, setPasswordError);
    validateReenteredPassword(reenteredPassword, password, setReenteredPasswordError);
    setTermsAgreement(!termsAgreement);
  };

  const user = {
    username,
    password,
    reenteredPassword,
    email,
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (usernameError || passwordError || reenteredPasswordError || emailError) {
      return;
    }

    fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          throw new Error(data.message);
        }
        history.push('/home');
      })
      .catch(err => setError(err.message));
  };

  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/forms.png)` }} className="form-wrapper-outer">
      <div className="form-wrapper-inner">
        <Form onSubmit={handleFormSubmit} className="register">
          <h3>Register</h3>
          {error && (
            <Form.Group className="red">
              <p>{`Registration Failed: ${error}`}</p>
            </Form.Group>
          )}
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
              autoComplete="off"
              value={password}
              onChange={(e) => handlePasswordInput(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicReenteredPassword" className={reenteredPasswordError ? 'red' : ''}>
            <Form.Label>
              {setReenteredPasswordError ? `Password ${reenteredPasswordError}` : `Confirm Password`}
            </Form.Label>
            <Form.Control
              type="password"
              name="reenteredPassword"
              placeholder="Confirm Password"
              autoComplete="off"
              value={reenteredPassword}
              onChange={(e) => handleReenteredPasswordInput(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              name="terms"
              type="checkbox"
              label="Agree to our"
              value={termsAgreement}
              onChange={handleTermsAgreementCheck}
            />
            <Link className="form-link" to="/termsAndPolicy"> Terms and Privacy Policy</Link>
          </Form.Group>

          <Form.Group>
            <Button
              type="submit"
              className="btn btn-dark btn-lg btn-block"
              disabled={!termsAgreement || usernameError || passwordError || reenteredPasswordError || emailError}
            >
              Register
            </Button>
          </Form.Group>

          <Form.Group className="center">
            <span>Already have an account?</span>
            <Link className="form-link" to="/login"> Login here</Link>
          </Form.Group>

        </Form>
      </div>
    </div>

  );
};

export default Register;
