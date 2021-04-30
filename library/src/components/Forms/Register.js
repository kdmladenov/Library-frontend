import './forms.css';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [termsAgreement, setTermsAgreement] = useState('');

  const handleUsernameInput = (value) => {
    // validation
    setUsername(value);
  };

  const handleEmailInput = (value) => {
    // validation
    setEmail(value);
  };

  const handlePasswordInput = (value) => {
    // validation
    setPassword(value);
  };

  const handlePasswordConfirmationInput = (value) => {
    // validation
    setPasswordConfirmation(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const navigateToTerms = (e) => {
    e.preventDefault();
    // navigate to Terms
  };

  const navigateToLogin = (e) => {
    e.preventDefault();
    // navigate to Login Page
  };

  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/forms.png)` }} className="form-wrapper-outer">
      <div className="form-wrapper-inner">
        <Form onSubmit={handleFormSubmit}>
          <h3>Register</h3>
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

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => handleEmailInput(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => handlePasswordInput(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => handlePasswordConfirmationInput(e.target.value)}
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
            <a href="/" className="form-link" onClick={(e) => navigateToTerms(e)}> Terms and Privacy Policy</a>
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
            <a href="/" className="form-link center" onClick={(e) => navigateToLogin(e)}>
              Already have an account? Login here
            </a>
          </Form.Group>

        </Form>
      </div>
    </div>

  );
};

export default Register;
