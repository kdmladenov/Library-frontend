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
}) => {
  const isAdmin = (getUser().role === 'admin');
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
    </div>
  );
};

UserCard.defaultProps = {
  avatar: `storage/avatars/defaultAvatar.png`,
};

UserCard.propTypes = {
  userId: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  readingPoints: PropTypes.number.isRequired,
  goToAccount: PropTypes.func.isRequired,

};

export default withRouter(UserCard);
