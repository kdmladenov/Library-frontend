import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './UserContainer.css';
import UserNavigation from '../../components/User/UserNavigation';
import Timeline from '../../components/User/Timeline';
import Profile from '../../components/User/Profile';
import ChangePassword from '../../components/User/ChangePassword';
import DeleteAccount from '../../components/User/DeleteAccount';
import { BASE_URL } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';

const UserContainer = () => {
  const history = useHistory();
  const [content, setContent] = useState('timeline');
  const [avatarUrl, setAvatarUrl] = useState('');

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
      .then(res => {
        setAvatarUrl(`${BASE_URL}/${res.avatar}`);
      })
      .catch(err => {
        if (err.message.startsWith('5')) {
          history.push('/serviceUnavailable');
        }
        if (err.message === '404') {
          history.push('*');
        }
      });
  }, []);

  return (
    <div className="outer" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/user-account.jpg)` }}>
      <div className="container">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <UserNavigation avatarUrl={avatarUrl} setContent={setContent} />
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            {content === 'timeline' && <Timeline />}
            {content === 'profile' && <Profile setAvatarUrl={setAvatarUrl} avatarUrl={avatarUrl} />}
            {content === 'changePassword' && <ChangePassword />}
            {content === 'deleteAccount' && <DeleteAccount />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserContainer;
