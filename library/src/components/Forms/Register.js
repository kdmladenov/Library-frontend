import './forms.css';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import validateInput from './userValidator';
import { BASE_URL } from '../../common/constants';

const Register = () => {
  const history = useHistory();
  const [error, setError] = useState('');
  const [termsAgreement, setTermsAgreement] = useState(false);

  const [user, setUser] = useState({
    username: '',
    password: '',
    reenteredPassword: '',
    email: '',
  });

  const updateUser = (prop, value) => setUser({ ...user, [prop]: value });

  const [inputErrors, setInputErrors] = useState({
    username: '',
    password: '',
    reenteredPassword: '',
    email: '',
  });

  const handleInput = (prop, value, match) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value, match) });
    updateUser(prop, value);
  };

  const handleTermsAgreementCheck = () => {
    setInputErrors({
      username: validateInput.username(user.username),
      password: validateInput.email(user.email),
      reenteredPassword: validateInput.password(user.password),
      email: validateInput.reenteredPassword(user.reenteredPassword, user.password),
    });
    setTermsAgreement(!termsAgreement);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

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
          <Form.Group controlId="formBasicName" className={inputErrors.username ? 'red' : ''}>
            <Form.Label>
              {`Username${inputErrors.username}`}
            </Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Username"
              value={user.username}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className={inputErrors.email ? 'red' : ''}>
            <Form.Label>
              {`Email${inputErrors.email}`}
            </Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={user.email}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className={inputErrors.password ? 'red' : ''}>
            <Form.Label>
              {`Password${inputErrors.password}`}
            </Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              autoComplete="off"
              value={user.password}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicReenteredPassword" className={inputErrors.reenteredPassword ? 'red' : ''}>
            <Form.Label>
              {inputErrors.reenteredPassword ? `Password ${inputErrors.reenteredPassword}` : `Confirm Password`}
            </Form.Label>
            <Form.Control
              type="password"
              name="reenteredPassword"
              placeholder="Confirm Password"
              autoComplete="off"
              value={user.reenteredPassword}
              onChange={(e) => handleInput(e.target.name, e.target.value, user.password)}
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
              disabled={
                !termsAgreement
                || inputErrors.username
                || inputErrors.password
                || inputErrors.reenteredPassword
                || inputErrors.email
              }
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
