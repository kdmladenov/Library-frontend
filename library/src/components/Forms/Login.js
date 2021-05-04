import './forms.css';
import { Button, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import validateInput from './userValidator';
import { BASE_URL } from '../../common/constants';
import AuthContext from '../../providers/AuthContext';

const Login = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const updateUser = (prop, value) => setUser({ ...user, [prop]: value });

  const [inputErrors, setInputErrors] = useState({
    username: '',
    password: '',
  });

  const handleInput = (prop, value) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value) });
    updateUser(prop, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!inputErrors.username && !inputErrors.password) {
      fetch(`${BASE_URL}/auth/login`, {
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
          const { token } = data;
          localStorage.setItem('token', token);
          auth.setAuthValue({
            isLoggedIn: true,
            user: user.username,
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
              disabled={inputErrors.username || inputErrors.password || !user.username || !user.password}
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
