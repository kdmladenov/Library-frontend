/* eslint-disable no-nested-ternary */
/* eslint-disable quote-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./reviews.css";
import BookCardRating from "../UI/BookCardRating";
import ShowMoreButton from "../UI/ShowMoreButton";
import { BASE_URL } from "../../common/constants";
import { getToken, getUser } from "../../providers/AuthContext";

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
  thumbsUpList,
  thumbsDownList,
}) => {
  const { userId } = getUser();
  const [countThumbsUp, setCountThumbsUp] = useState(thumbsUp);
  const [countThumbsDown, setCountThumbsDown] = useState(thumbsDown);
  const [currentVote, setCurrentVote] = useState(
    thumbsUpList && thumbsUpList.toString().split(',').map(Number).includes(userId)
      ? "UP"
      : thumbsDownList && thumbsDownList.toString().split(',').map(Number).includes(userId)
        ? "DOWN"
        : "",
  );
  console.log(currentVote);
  const [error, setError] = useState(null);
  const token = getToken();

  const handleVoteButton = (method, reactionName) => {
    fetch(`${BASE_URL}/reviews/${reviewId}/votes`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reactionName }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.message);
        }
        if (method === "PUT" && reactionName === "THUMBS_UP") {
          if (currentVote === "DOWN") {
            setCountThumbsDown(countThumbsDown - 1);
          }
          setCurrentVote("UP");
          setCountThumbsUp(countThumbsUp + 1);
        }
        if (method === "DELETE" && reactionName === "THUMBS_UP") {
          setCurrentVote("");
          setCountThumbsUp(countThumbsUp - 1);
        }
        if (method === "PUT" && reactionName === "THUMBS_DOWN") {
          if (currentVote === "UP") {
            setCountThumbsUp(countThumbsUp - 1);
          }
          setCurrentVote("DOWN");
          setCountThumbsDown(countThumbsDown + 1);
        }
        if (method === "DELETE" && reactionName === "THUMBS_DOWN") {
          setCurrentVote("");
          setCountThumbsDown(countThumbsDown - 1);
        }
      })
      .catch((e) => setError(e.message));
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div id={`review-card-detailed-${reviewId}`}>
      <div id="review-card-user-info">
        <img
          src={`${BASE_URL}/${avatar}`}
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
          onClick={(currentVote === '' || currentVote === 'DOWN')
            ? () => handleVoteButton("PUT", "THUMBS_UP")
            : () => handleVoteButton("DELETE", "THUMBS_UP")}
          src={`${BASE_URL}/storage/icons/thumbUp.png`}
          id={(currentVote === 'UP') ? 'review-img-thumbs-up-active' : 'review-img-thumbs-up-inactive'}
          alt="thumbs up"
        />
        <div id="review-card-thumb">{countThumbsUp || 0}</div>
        <img
          onClick={(currentVote === '' || currentVote === 'UP')
            ? () => handleVoteButton("PUT", "THUMBS_DOWN")
            : () => handleVoteButton("DELETE", "THUMBS_DOWN")}
          src={`${BASE_URL}/storage/icons/thumbDown.png`}
          id={(currentVote === 'DOWN') ? 'review-img-thumbs-down-active' : 'review-img-thumbs-down-inactive'}
          alt="thumbs down"
        />
        <div id="review-card-thumb">{countThumbsDown || 0}</div>
      </div>
    </div>
  );
};
ReviewCard.defaultProps = {
  rating: 0,
  dateEdited: "N/A",
  thumbsUp: 0,
  thumbsDown: 0,
  thumbsUpList: '',
  thumbsDownList: '',
};
ReviewCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  rating: PropTypes.number,
  title: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  dateEdited: PropTypes.string,
  content: PropTypes.string.isRequired,
  // userId: PropTypes.number.isRequired,
  reviewId: PropTypes.number.isRequired,
  thumbsUp: PropTypes.number,
  thumbsDown: PropTypes.number,
  thumbsUpList: PropTypes.string,
  thumbsDownList: PropTypes.string,
};

export default ReviewCard;
