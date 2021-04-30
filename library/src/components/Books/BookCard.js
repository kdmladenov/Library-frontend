/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import "./books.css";
import BookCardRating from "../UI/BookCardRating";

const BookCard = ({
  bookId,
  frontCover,
  title,
  author,
  bookRating,
  reviewCount,
  singleBook,
}) => {
  //  singleBook = singleBook || (() => {});

  return (
    <div className="bookCard" id={bookId}>
      <img
        // to fix http://localhost:5555
        src={`http://localhost:5555/${frontCover}`}
        id="book-card-image"
        onClick={singleBook || (() => {})}
        alt="front cover"
      />
      <div id="cardTitle" onClick={singleBook || (() => {})}>
        <div id="book-card-title">{title}</div>
        <div id="book-card-author">{author}</div>
        <div id="book-card-rating-count">
          <div>
            <BookCardRating bookRating={bookRating || 0} />
          </div>
          <div id="book-card-review-count">{reviewCount || 0}</div>
        </div>
      </div>
    </div>
  );
};
BookCard.defaultProps = {
  bookRating: 0,
  reviewCount: 0,
};

BookCard.propTypes = {
  bookId: PropTypes.number.isRequired,
  frontCover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  bookRating: PropTypes.number,
  reviewCount: PropTypes.number,
  singleBook: PropTypes.func.isRequired,
};

export default BookCard;
