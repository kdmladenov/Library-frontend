/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import "./reviews.css";
import BookCardRating from "../UI/BookCardRating";
import ShowMoreButton from "../UI/ShowMoreButton";
import server from "../../common/server";

const ReviewCard = ({
  // userId,
  avatar,
  username,
  reviewId,
  rating,
  title,
  dateCreated,
  dateEdited,
  content,
  // bookId,
  thumbsUp,
  thumbsDown,
}) => {
  // const backButton = () => history.goBack();
  return (
    <div id={`review-card-detailed-${reviewId}`}>
      <div id="review-card-user-info">
        <img
          src={`${server.baseURL}/${avatar}`}
          id="review-user-avatar"
          alt="user avatar"
        />
        <div id="review-card-username">{username}</div>
      </div>
      <div id="review-card-rating-title">
        <div id="review-card-rating">
          <BookCardRating bookRating={rating || 0} />
        </div>
        <div id="review-card-title">{title}</div>
      </div>
      <div id="review-card-dates">
        <div id="review-card-date-created">
          {`Date created: ${new Date(dateCreated).toLocaleDateString("en-US")}`}
        </div>
        <div id="review-card-date-updated">
          {dateEdited && `Date edited: ${new Date(dateEdited).toLocaleDateString("en-US")}`}
        </div>
      </div>
      <div id="review-card-content">
        <ShowMoreButton breakpoint={300} text={content} />
      </div>
      <div id="review-card-thumbs">
        <img
          src={`${server.baseURL}/storage/icons/thumbUp.png`}
          id="review-thumbs"
          alt="thumbs up"
        />
        <div id="review-card-thumb">{thumbsUp || 0}</div>
        <img
          src={`${server.baseURL}/storage/icons/thumbDown.png`}
          id="review-thumbs"
          alt="thumbs down"
        />
        <div id="review-card-thumb">{thumbsDown || 0}</div>
      </div>
    </div>
  );
};
ReviewCard.defaultProps = {
  rating: 0,
  dateEdited: "N/A",
  thumbsUp: 0,
  thumbsDown: 0,
};
ReviewCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  rating: PropTypes.number,
  title: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  dateEdited: PropTypes.string,
  content: PropTypes.string.isRequired,
  // bookId: PropTypes.number.isRequired,
  reviewId: PropTypes.number.isRequired,
  thumbsUp: PropTypes.number,
  thumbsDown: PropTypes.number,
};

export default withRouter(ReviewCard);
