import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './UserContainer.css';
import UserNavigation from '../../components/User/UserNavigation';
import Timeline from '../../components/User/Timeline';
import Profile from '../../components/User/Profile';
import ChangePassword from '../../components/User/ChangePassword';
import DeleteAccount from '../../components/User/DeleteAccount';
import { BASE_URL } from '../../common/constants';
import { getToken, getUser } from '../../providers/AuthContext';
import BanUser from '../../components/Admin/BanUser';
import Loading from '../../components/UI/Loading';

const UserContainer = ({ defaultContent }) => {
  const history = useHistory();
  const params = useParams();
  const id = params.userId || getUser().userId;
  const [content, setContent] = useState(defaultContent);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
        setAvatarUrl(`${BASE_URL}/${res.avatar}`);
        setUsername(res.username);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        if (err.message === '404') {
          history.push('*');
        } else history.push('/serviceUnavailable');
      });
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
    <div className="outer" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/user-account.jpg)` }}>
      <div className="container">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <UserNavigation avatarUrl={avatarUrl} setContent={setContent} username={username} />
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            {content === 'timeline' && <Timeline />}
            {content === 'profile' && <Profile setAvatarUrl={setAvatarUrl} avatarUrl={avatarUrl} />}
            {content === 'changePassword' && <ChangePassword />}
            {content === 'deleteAccount' && <DeleteAccount />}
            {content === 'banUser' && <BanUser />}
          </div>
        </div>
      </div>
    </div>
  );
};

UserContainer.propTypes = {
  defaultContent: PropTypes.string.isRequired,
};

export default UserContainer;
