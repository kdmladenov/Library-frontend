import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import { getToken, getUser } from '../../providers/AuthContext';
// import Loading from '../UI/Loading';

const UserNavigation = ({ avatarUrl, setContent, username }) => {
  const history = useHistory();
  const params = useParams();
  const id = params.userId || getUser().userId;
  const { role } = getUser();
  const [user, setUser] = useState({
    username,
    avatar: '',
  });
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch(`${BASE_URL}/users/${id}/avatar`, {
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
      .then(res => {
        setUser({ ...user, ...res });
        // setLoading(false);
      })
      .catch(err => {
        // setLoading(false);
        if (err.message === '404') {
          history.push('*');
        } else history.push('/serviceUnavailable');
      });
  }, []);

  // if (loading) {
  //   return (
  //     <div>
  //       <Loading>
  //         <h1>Loading...</h1>
  //       </Loading>
  //     </div>
  //   );
  // }

  return (
    <div className="card-body">
      <div className="account-settings">
        <div className="user-profile">
          <div className="user-avatar" style={{ backgroundImage: `url(${avatarUrl})` }} />
          <h4 className="user-name">{username}</h4>
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
  username: PropTypes.string.isRequired,
};

export default UserNavigation;
