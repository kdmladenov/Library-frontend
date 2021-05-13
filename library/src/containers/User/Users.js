/* eslint-disable react/jsx-props-no-spreading */
import { useHistory, useLocation } from 'react-router-dom';
import { BASE_URL } from '../../common/constants';
import './Users.css';
import useHttp from '../../hooks/useHttp';
import UserCard from '../../components/Admin/UserCard';
import Paging from '../../components/Paging/Paging';

const Users = () => {
  const history = useHistory();
  const location = useLocation();
  const { data, error } = useHttp(
    `${BASE_URL}/users${location.search}`,
    "GET",
    [],
  );

  // if (loading) {
  //   return <Loading />;
  // }

  if (error === '404') {
    history.push('*');
  } else if (error) {
    history.push('/serviceUnavailable');
  }

  const userCards = (
    <div className="user-list">
      {data.map((user) => {
        return (
          <UserCard
            key={user.userId}
            {...user}
            users={data}
            goToAccount={() => history.push(`/users/${user.userId}`)}
          />
        );
      })}
    </div>
  );
  return (
    <div className="users-container-outer">
      <div className="users-container-inner">
        {data.length ? <ul>{userCards}</ul> : <h2> No books are found... </h2>}
        <div id="paging-users">
          <Paging resource="/users" />
        </div>
      </div>
    </div>
  );
};
export default Users;
