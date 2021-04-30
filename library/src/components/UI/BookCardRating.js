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
  bookRating: PropTypes.number.isRequired,
};

export default BookCardRating;
