/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './UserCard.css';
import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { BASE_URL } from '../../common/constants';
import { getUser } from '../../providers/AuthContext';

const UserCard = ({
  userId,
  avatar,
  username,
  role,
  readingPoints,
  goToAccount,
  // updateUsers,
  // users,
}) => {
  const isAdmin = (getUser().role === 'admin');
  // const history = useHistory();

  // const deleteBook = () => {
  //   fetch(`${BASE_URL}/books/${bookId}`, {
  //     method: 'DELETE',
  //     headers: {
  //       Authorization: `Bearer ${getToken()}`,
  //     },
  //   })
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error(res.status);
  //       }
  //       return res.json();
  //     })
  //     .then(res => {
  //       const updated = books.filter(b => b.bookId !== res.bookId);
  //       updateBooks(updated);
  //     })
  //     .catch(err => {
  //       if (err.message === '404') {
  //         history.push('*');
  //       } else history.push('/serviceUnavailable');
  //     });
  // };

  // const editBook = () => {
  //   history.push(`/books/${bookId}/update`);
  // };

  return (
    <div className="userCard" id={userId}>
      <img
        type="button"
        src={`${BASE_URL}/${avatar}`}
        id="user-card-image"
        onClick={isAdmin ? (goToAccount ? goToAccount : () => {}) : null}
        alt="user avatar"
      />
      <div id="userInfo">
        <div id="user-card-username" onClick={isAdmin ? (goToAccount ? goToAccount : () => {}) : null}>{username}</div>
        <div id="user-card-role">{role}</div>
        <div id="user-card-reading-points">
          {`${readingPoints} reading points`}
        </div>
      </div>
      {/* {adminButtonsAreVisible && (
        <div className="adminBtn">
          <img type="button" className="btn" onClick={deleteBook} src={`${BASE_URL}/storage/icons/delete-icon.png`} alt="delete button" />
          <img type="button" className="btn" onClick={editBook} src={`${BASE_URL}/storage/icons/edit-icon.svg`} alt="edit button" />
        </div>
      )} */}
    </div>
  );
};

UserCard.defaultProps = {
  avatar: `storage/avatars/defaultAvatar.png`,
//   updateUsers: () => {},
//   users: [],
};

UserCard.propTypes = {
  userId: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  readingPoints: PropTypes.number.isRequired,
  goToAccount: PropTypes.func.isRequired,
  // updateUsers: PropTypes.func.isRequired,
  // users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withRouter(UserCard);
