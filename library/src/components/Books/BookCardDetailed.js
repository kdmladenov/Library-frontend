import React from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./books.css";
import icon from "../../data/covers/icon.png";
import { bookDetailsCarouselBreakpoints } from "../../common/carousel";
import BookCardRating from "../UI/BookCardRating";

import ShowMoreButton from "../UI/ShowMoreButton";
import { BASE_URL } from '../../common/constants';
import PropsCard from './PropsCard';

const BookCardDetailed = ({
  bookId,
  frontCover,
  title,
  author,
  bookRating,
  reviewCount,
  bookedUntil,
  summary,
  datePublished,
  isbn,
  genre,
  ageRecommendation,
  language,
  pages,
}) => {
  return (
    <div className="book-card-detailed" id={bookId}>
      <img
        src={`${BASE_URL}/${frontCover}`}
        id="book-detail-card-image"
        alt="front cover"
      />
      <div id="book-card-rating-count">
        <div>
          <BookCardRating bookRating={bookRating || 0} />
        </div>
        <div id="book-detail-card-review-count">{reviewCount || 0}</div>
      </div>
      <button
        type="button"
        // to implement return a book
        id={
          bookedUntil
            ? "book-detail-card-bookedUntil-booked"
            : "book-detail-card-bookedUntil-available"
        }
      >
        {bookedUntil
          ? `Booked until ${new Date(bookedUntil).toLocaleDateString("en-US")}`
          : "Available"}
      </button>
      <div id="book-detail-card-title">{title}</div>
      <div id="book-detail-card-author">{author}</div>
      <div id="book-detail-props-carousel">
        <Carousel
          responsive={bookDetailsCarouselBreakpoints}
          containerClass="props-carousel-container"
        >
          <PropsCard id={1} title="Genre" icon={icon} property={genre} />
          <PropsCard
            id={2}
            title="Date published"
            icon={icon}
            property={datePublished}
          />
          <PropsCard id={3} title="Language" icon={icon} property={language} />
          <PropsCard
            id={4}
            title="Age recommendation"
            icon={icon}
            property={ageRecommendation}
          />
          <PropsCard id={5} title="ISBN" icon={icon} property={isbn} />
          <PropsCard id={6} title="Page count" icon={icon} property={pages} />
        </Carousel>
      </div>
      <div id="book-detail-card-summary">
        <ShowMoreButton breakpoint={300} text={summary} />
      </div>
    </div>
  );
};
BookCardDetailed.defaultProps = {
  bookRating: 0,
  reviewCount: 0,
  bookedUntil: "",
};
BookCardDetailed.propTypes = {
  bookId: PropTypes.number.isRequired,
  frontCover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  bookRating: PropTypes.number,
  reviewCount: PropTypes.number,
  genre: PropTypes.string.isRequired,
  pages: PropTypes.number.isRequired,
  datePublished: PropTypes.string.isRequired,
  bookedUntil: PropTypes.string,
  summary: PropTypes.string.isRequired,
  isbn: PropTypes.string.isRequired,
  ageRecommendation: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default BookCardDetailed;
