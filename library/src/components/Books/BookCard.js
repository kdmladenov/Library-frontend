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
}) => {
  // const singleBook = props.singleBook || (() => {});

  return (
    <div className="bookCard" id={bookId}>
      <img
        src={frontCover}
        id="book-card-image"
        // onClick={singleBook}
        alt="front cover"
      />
      {/* <div id="cardTitle" onClick={singleBook}> */}
      <div id="book-card-title">{title}</div>
      <div id="book-card-author">{author}</div>
      <div id="book-card-rating-count">
        <div>
          <BookCardRating bookRating={bookRating} />
        </div>
        <div id="book-card-review-count">{reviewCount}</div>
      </div>
    </div>
    // </div>
  );
};

BookCard.propTypes = {
  bookId: PropTypes.number.isRequired,
  frontCover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  bookRating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  // genre: PropTypes.string.isRequired,
  // pages: PropTypes.number.isRequired,
  // date_published: PropTypes.string.isRequired,
  // singleBook: PropTypes.func.isRequired,
};

export default BookCard;
