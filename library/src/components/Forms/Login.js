import './forms.css';
import { Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { validatePassword, validateUsername } from './userValidator';
import { BASE_URL } from '../../common/constants';
import AuthContext from '../../providers/AuthContext';

const Login = () => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const auth = useContext(AuthContext);
  const history = useHistory();

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

    if (!usernameError && !passwordError) {
      fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.message) {
            throw new Error(data.message);
          }
          const { token } = data;
          localStorage.setItem('token', token);
          auth.setAuthValue({
            isLoggedIn: true,
            user: username,
          });
          history.push('/home');
        })
        .catch(err => setError(err.message));
    }
  };

  return (
    <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/forms.png)` }} className="form-wrapper-outer">
      <div className="form-wrapper-inner">
        <Form onSubmit={handleFormSubmit} className="login">
          <h3>Login</h3>
          {error && (
            <Form.Group className="red">
              <p>{`Login Failed: ${error}`}</p>
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
              disabled={usernameError || passwordError || !username || !password}
            >
              Login
            </Button>
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox2" className="center">
            <span>New here?</span>
            <Link className="form-link" to="/register"> Create an account</Link>
          </Form.Group>

        </Form>
      </div>
    </div>

  );
};

export default Login;
