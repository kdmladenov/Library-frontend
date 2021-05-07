/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./books.css";
import icon from "../../data/covers/icon.png";
import { bookDetailsCarouselBreakpoints } from "../../common/carousel";
import BookCardRating from "../UI/BookCardRating";
import ShowMoreButton from "../UI/ShowMoreButton";
import { BASE_URL } from "../../common/constants";
import PropsCard from "./PropsCard";
import { getToken, getUser } from "../../providers/AuthContext";
// import useHttp from "../../hooks/useHttp";
import Loading from "../UI/Loading";

const BookCardDetailed = ({
  bookId,
  frontCover,
  title,
  author,
  bookRating,
  reviewCount,
  borrowedUntil,
  borrowedByUser,
  summary,
  datePublished,
  isbn,
  genre,
  ageRecommendation,
  language,
  pages,
}) => {
  const { userId } = getUser();
  const [record, setRecord] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleBorrowBook = () => {
    const token = getToken();

    setLoading(true);

    fetch(`${BASE_URL}/books/${bookId}/records`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.message);
        }
        setRecord(`You have borrowed this book.`);
        console.log(record, result);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <h1>{error}</h1>;
    }
  };

  const handleReturnBook = () => {
    const token = getToken();

    setLoading(true);

    fetch(`${BASE_URL}/books/${bookId}/records`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.message);
        }
        setRecord(`You have returned this book.`);
        console.log(record, result);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <h1>{error}</h1>;
    }
  };

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
          !borrowedUntil
            ? "book-detail-card-borrowedUntil-available"
            : borrowedUntil && borrowedByUser === userId
              ? "book-detail-card-borrowedUntil-return"
              : "book-detail-card-borrowedUntil-borrowed"
        }
        onClick={
          !borrowedUntil
            ? () => handleBorrowBook()
            : borrowedUntil && borrowedByUser === userId
              ? () => handleReturnBook()
              : null
        }
      >
        {!borrowedUntil
          ? "Available"
          : borrowedUntil && borrowedByUser === userId
            ? "Return"
            : `Borrowed until ${new Date(borrowedUntil).toLocaleDateString(
              "en-US",
            )}`}
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
  borrowedUntil: null,
  borrowedByUser: null,
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
  borrowedUntil: PropTypes.string,
  borrowedByUser: PropTypes.number,
  summary: PropTypes.string.isRequired,
  isbn: PropTypes.string.isRequired,
  ageRecommendation: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default BookCardDetailed;
