import { useState } from 'react';
import UserContainer from './UserContainer';
import Profile from '../../components/User/Profile';

const UserProfile = () => {
  const [avatarUrl, setAvatarUrl] = useState('');
  return (
    <UserContainer avatarUrl={avatarUrl}>
      <Profile avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} />
    </UserContainer>
  );
};

export default UserProfile;
