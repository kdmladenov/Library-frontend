/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './BookCard.css';
import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import BookCardRating from "../UI/BookCardRating";
import { BASE_URL } from '../../common/constants';
import { getUser } from '../../providers/AuthContext';

const BookCard = ({
  bookId,
  frontCover,
  title,
  author,
  bookRating,
  reviewCount,
  goToDetails,
}) => {
  const isLoggedIn = !!getUser();
  return (
    <div className="bookCard" id={bookId}>
      <img
        type="button"
        src={`${BASE_URL}/${frontCover}`}
        id="book-card-image"
        onClick={isLoggedIn ? (goToDetails ? goToDetails : () => {}) : null}
        alt="front cover"
      />
      <div id="cardTitle">
        <div id="book-card-title" onClick={isLoggedIn ? (goToDetails ? goToDetails : () => {}) : null}>{title}</div>
        <div id="book-card-author">{author}</div>
        <div id="book-card-rating-count">
          <div>
            <BookCardRating key={bookId} bookRating={bookRating || 0} />
          </div>
          <div id="book-card-review-count">{reviewCount || 0}</div>
        </div>
      </div>
    </div>
  );
};

BookCard.defaultProps = {
  bookRating: 'Not rated yet',
  reviewCount: 'Not reviewed yet',
};

BookCard.propTypes = {
  bookId: PropTypes.number.isRequired,
  frontCover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  bookRating: PropTypes.number,
  reviewCount: PropTypes.number,
  goToDetails: PropTypes.func.isRequired,
};

export default withRouter(BookCard);
