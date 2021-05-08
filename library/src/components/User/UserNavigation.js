import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import { getToken, getUser } from '../../providers/AuthContext';

const UserNavigation = ({ avatarUrl }) => {
  const history = useHistory();
  const { username } = getUser();
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
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          throw new Error(res.message);
        }

        setUser({ ...user, ...res });
      })
      .catch(() => history.push('/notFound'));
  }, []);

  return (
    <div className="card-body">
      <div className="account-settings">
        <div className="user-profile">
          <div className="user-avatar" style={avatarUrl ? { backgroundImage: `url(${avatarUrl})` } : { backgroundImage: `url(${BASE_URL}/${user.avatar})` }} />
          <h4 className="user-name">{user.username}</h4>
        </div>
        <div className="about">
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              // onClick={() => setContent('timeline')}
              onClick={() => history.push('/user/timeline')}
            >
              Timeline
              {/* <Link to="/user/timeline">Timeline</Link> */}
            </Button>
          </Form.Group>
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              // onClick={() => setContent('profile')}
              onClick={() => history.push('/user/profile')}
            >
              Profile
              {/* <Link to="/user/profile">Profile</Link> */}
            </Button>
          </Form.Group>
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              // onClick={() => setContent('changePassword')}
              onClick={() => history.push('/user/changePassword')}
            >
              Change Password
              {/* <Link to="/user/changePassword">Change Password</Link> */}
            </Button>
          </Form.Group>
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
};

export default UserNavigation;
