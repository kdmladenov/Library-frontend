/* eslint-disable no-nested-ternary */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './BookCard.css';
import React from "react";
import { useHistory, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import BookCardRating from "../UI/BookCardRating";
import { BASE_URL } from '../../common/constants';
import { getToken, getUser } from '../../providers/AuthContext';

const BookCard = ({
  bookId,
  frontCover,
  title,
  author,
  bookRating,
  reviewCount,
  goToDetails,
  adminButtonsAreVisible,
  updateBooks,
  books,
}) => {
  const isLoggedIn = !!getUser();
  const history = useHistory();

  const deleteBook = () => {
    fetch(`${BASE_URL}/books/${bookId}`, {
      method: 'DELETE',
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
        const updated = books.filter(b => b.bookId !== res.bookId);
        updateBooks(updated);
      })
      .catch(err => {
        if (err.message === '404') {
          history.push('*');
        } else history.push('/serviceUnavailable');
      });
  };

  const editBook = () => {
    history.push(`/books/${bookId}/update`);
  };
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
      {adminButtonsAreVisible && (
        <div className="adminBtn">
          <img type="button" className="btn" onClick={deleteBook} src={`${BASE_URL}/storage/icons/delete-icon.png`} alt="delete button" />
          <img type="button" className="btn" onClick={editBook} src={`${BASE_URL}/storage/icons/edit-icon.svg`} alt="edit button" />
        </div>
      )}
    </div>
  );
};

BookCard.defaultProps = {
  bookRating: 'Not rated yet',
  reviewCount: 'Not reviewed yet',
  updateBooks: () => {},
  books: [],
};

BookCard.propTypes = {
  bookId: PropTypes.number.isRequired,
  frontCover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  bookRating: PropTypes.number,
  reviewCount: PropTypes.number,
  goToDetails: PropTypes.func.isRequired,
  adminButtonsAreVisible: PropTypes.bool.isRequired,
  updateBooks: PropTypes.func,
  books: PropTypes.arrayOf(PropTypes.object),
};

export default withRouter(BookCard);
