/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./books.css";
import icon from "../../data/covers/icon.png";
import propsCarouselBreakpoints from "./PropsCarousel/propsCarouselBreakpoints";
import BookCardRating from "../UI/BookCardRating";
import PropCard from "./PropsCarousel/PropsCard";
import ShowMoreButton from "../UI/ShowMoreButton";
// import { Button } from "react-bootstrap";

const BookCardDetailed = ({
  bookId,
  frontCover,
  title,
  author,
  bookRating,
  reviewCount,
  // bookedUntil,
  summary,
  datePublished,
  isbn,
  genre,
  ageRecommendation,
  language,
  pages,
  singleBook,
}) => {
  return (
    <div className="book-card-detailed" id={bookId}>
      <img
        src={frontCover}
        id="book-detail-card-image"
        onClick={singleBook}
        alt="front cover"
      />
      <div id="book-card-rating-count">
        <div>
          <BookCardRating bookRating={bookRating} />
        </div>
        <div id="book-detail-card-review-count">{reviewCount}</div>
      </div>
      <button type="button" id="book-detail-card-bookedUntil">
        Available
      </button>
      <div id="book-detail-card-title">{title}</div>
      <div id="book-detail-card-author">{author}</div>
      <div id="book-detail-props-carousel">
        <Carousel
          responsive={propsCarouselBreakpoints}
          containerClass="props-carousel-container"
        >
          <PropCard id={1} title="Genre" icon={icon} property={genre} />
          <PropCard
            id={2}
            title="Date published"
            icon={icon}
            property={datePublished}
          />
          <PropCard id={3} title="Language" icon={icon} property={language} />
          <PropCard
            id={4}
            title="Age recommendation"
            icon={icon}
            property={ageRecommendation}
          />
          <PropCard id={5} title="ISBN" icon={icon} property={isbn} />
          <PropCard id={6} title="Page count" icon={icon} property={pages} />
        </Carousel>
      </div>
      <div id="book-detail-card-summary">
        <ShowMoreButton breakpoint={300} text={summary} />
      </div>
    </div>
  );
};

BookCardDetailed.propTypes = {
  bookId: PropTypes.number.isRequired,
  frontCover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  bookRating: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
  pages: PropTypes.number.isRequired,
  datePublished: PropTypes.string.isRequired,
  // bookedUntil: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  isbn: PropTypes.string.isRequired,
  ageRecommendation: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  singleBook: PropTypes.func.isRequired,
};

export default BookCardDetailed;
