/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./books.css";
import icon from "../../data/covers/icon.png";
import { bookDetailsCarouselBreakpoints } from "../../constants/carousel";
import BookCardRating from "../UI/BookCardRating";
import PropCard from "./PropsCarousel/PropsCard";
import ShowMoreButton from "../UI/ShowMoreButton";
import server from '../../constants/server';
// import { Button } from "react-bootstrap";

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
  // singleBook,
}) => {
  return (
    <div className="book-card-detailed" id={bookId}>
      <img
        src={`${server.baseURL}/${frontCover}`}
        id="book-detail-card-image"
        // onClick={singleBook}
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
        // to implement return
        id={
          bookedUntil
            ? "book-detail-card-bookedUntil-booked"
            : "book-detail-card-bookedUntil-available"
        }
      >
        {bookedUntil ? `Booked until ${new Date(bookedUntil).toLocaleDateString('en-US')}` : "Available"}
      </button>
      <div id="book-detail-card-title">{title}</div>
      <div id="book-detail-card-author">{author}</div>
      <div id="book-detail-props-carousel">
        <Carousel
          responsive={bookDetailsCarouselBreakpoints}
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
BookCardDetailed.defaultProps = {
  bookRating: 0,
  reviewCount: 0,
  pages: 0,
  datePublished: "N/A",
  bookedUntil: "",
  summary: "",
  ageRecommendation: "All ages",
  language: "English",
  // singleBook: PropTypes.func.isRequired,storage\covers\76.jpg
};
BookCardDetailed.propTypes = {
  bookId: PropTypes.number.isRequired,
  frontCover: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  bookRating: PropTypes.number,
  reviewCount: PropTypes.number,
  genre: PropTypes.string.isRequired,
  pages: PropTypes.number,
  datePublished: PropTypes.string,
  bookedUntil: PropTypes.string,
  summary: PropTypes.string,
  isbn: PropTypes.string.isRequired,
  ageRecommendation: PropTypes.string,
  language: PropTypes.string,
  // singleBook: PropTypes.func.isRequired,
};

export default BookCardDetailed;
