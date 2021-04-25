import React, { useState } from "react";
import PropTypes from "prop-types";

const ShowMoreButton = ({ text, breakpoint }) => {
  const [showMore, setShowMore] = useState(false);

  const showMoreClick = () => {
    setShowMore(true);
  };

  const showLessClick = () => {
    setShowMore(false);
  };

  const numberOfItems = showMore ? { text }.length : breakpoint;
  return (
    <div>
      <div>{text.slice(0, numberOfItems)}</div>
      {!showMore && (
        <button
          id="show-more-button"
          type="button"
          onClick={() => showMoreClick()}
        >
          ...Show more
        </button>
      )}
      {showMore && (
        <button
          id="show-less-button"
          type="button"
          onClick={() => showLessClick()}
        >
          ...Show less
        </button>
      )}
    </div>
  );
};

ShowMoreButton.propTypes = {
  text: PropTypes.string.isRequired,
  breakpoint: PropTypes.number.isRequired,
};

export default ShowMoreButton;
