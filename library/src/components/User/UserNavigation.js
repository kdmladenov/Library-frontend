import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import { getToken, getUser } from '../../providers/AuthContext';

const UserNavigation = ({ avatarUrl, setContent }) => {
  const history = useHistory();
  const { username, role } = getUser();
  const [user, setUser] = useState({
    username,
    avatar: '',
  });
  useEffect(() => {
    fetch(`${BASE_URL}/users/avatar`, {
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
      .then(res => setUser({ ...user, ...res }))
      .catch(err => {
        if (err.message === '404') {
          history.push('*');
        } else history.push('/serviceUnavailable');
      });
  }, []);

  return (
    <div className="card-body">
      <div className="account-settings">
        <div className="user-profile">
          <div className="user-avatar" style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : { backgroundImage: `url(${BASE_URL}/storage/avatars/defaultAvatar.png)` }} />
          <h4 className="user-name">{user.username}</h4>
        </div>
        <div className="about">
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              onClick={() => setContent('timeline')}
            >
              Timeline
            </Button>
          </Form.Group>
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              onClick={() => setContent('profile')}
            >
              Profile
            </Button>
          </Form.Group>
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              onClick={() => setContent('changePassword')}
            >
              Change Password
            </Button>
          </Form.Group>
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              onClick={() => setContent('deleteAccount')}
            >
              Delete Account
            </Button>
          </Form.Group>

          {role === 'admin' && (
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              onClick={() => setContent('banUser')}
            >
              Ban User
            </Button>
          </Form.Group>
          )}
        </div>
      </div>
    </div>
  );
};

UserNavigation.defaultProps = {
  avatarUrl: ``,
};

UserNavigation.propTypes = {
  avatarUrl: PropTypes.string,
  setContent: PropTypes.func.isRequired,
};

export default UserNavigation;
