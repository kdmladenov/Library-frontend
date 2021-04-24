import React from "react";
import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";

const BookCardRating = ({ bookRating }) => {
  return (
    <div>
      <StarRatings
        rating={bookRating}
        starRatedColor="orange"
        starDimension="17px"
        starSpacing="1px"
        numberOfStars={5}
        name="rating"
      />
    </div>
  );
};

BookCardRating.propTypes = {
  // bookId: PropTypes.number.isRequired,
  // frontCover: PropTypes.string.isRequired,
  // title: PropTypes.string.isRequired,
  // author: PropTypes.string.isRequired,
  bookRating: PropTypes.number.isRequired,
  // reviewCount: PropTypes.number.isRequired,
  // genre: PropTypes.string.isRequired,
  // pages: PropTypes.number.isRequired,
  // date_published: PropTypes.string.isRequired,
  // singleBook: PropTypes.func.isRequired,
};

export default BookCardRating;
