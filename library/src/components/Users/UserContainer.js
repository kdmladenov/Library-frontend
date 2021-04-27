import { useState } from 'react';
import ChangePassword from './ChangePassword';
import EditProfile from './EditProfile';
import UserAccount from './UserAccount';
import UserTimeline from './UserTimeline';

const UserContainer = () => {
  const [content, setContent] = useState('timeline');

  if (content === 'timeline') {
    return (
      <UserAccount setContent={setContent}>
        <UserTimeline />
      </UserAccount>
    );
  }

  if (content === 'editProfile') {
    return (
      <UserAccount setContent={setContent}>
        <EditProfile />
      </UserAccount>
    );
  }

  if (content === 'changePassword') {
    return (
      <UserAccount setContent={setContent}>
        <ChangePassword />
      </UserAccount>
    );
  }
};

export default UserContainer;
