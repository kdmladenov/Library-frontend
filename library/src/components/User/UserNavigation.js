import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import { getToken, getUser } from '../../providers/AuthContext';
import Loading from '../UI/Loading';

const UserNavigation = ({ avatarUrl }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const { username } = getUser();
  const [user, setUser] = useState({
    username,
    avatar: '',
  });

  useEffect(() => {
    setLoading(true);
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

        setLoading(false);
        setUser({ ...user, ...res });
      })
      .catch(() => history.push('/notFound'));
  }, []);

  if (loading) {
    return (
      <div>
        <Loading>
          <h1>Loading...</h1>
        </Loading>
      </div>
    );
  }

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
            >
              <Link to="/user/timeline">Timeline</Link>
            </Button>
          </Form.Group>
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              // onClick={() => setContent('profile')}
            >
              <Link to="/user/profile">Profile</Link>
            </Button>
          </Form.Group>
          <Form.Group>
            <Button
              className="btn btn-dark btn-lg btn-block"
              // onClick={() => setContent('changePassword')}
            >
              <Link to="/user/changePassword">Change Password</Link>
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
