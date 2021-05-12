/* eslint-disable no-nested-ternary */
/* eslint-disable quote-props */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";
import "./reviews.css";
import BookCardRating from "../UI/BookCardRating";
import ShowMoreButton from "../UI/ShowMoreButton";
import { BASE_URL } from "../../common/constants";
import { getToken, getUser } from "../../providers/AuthContext";

const ReviewCard = ({
  userId: authorId,
  avatar,
  username,
  reviewId,
  rating,
  title,
  dateCreated,
  dateEdited,
  content,
  thumbsUp,
  thumbsDown,
  userThumbsUpList,
  userThumbsDownList,
}) => {
  const { userId } = getUser();
  const [countThumbsUp, setCountThumbsUp] = useState(thumbsUp);
  const [countThumbsDown, setCountThumbsDown] = useState(thumbsDown);
  const [editMode, setEditMode] = useState(false);
  const [ratings, setRatings] = useState(rating);
  const [contents, setContents] = useState(content);
  const [titles, setTitles] = useState(title);
  const [currentVote, setCurrentVote] = useState(
    userThumbsUpList && userThumbsUpList.toString().split(",").map(Number).includes(userId)
      ? "UP"
      : userThumbsDownList && userThumbsDownList.toString().split(",").map(Number).includes(userId)
        ? "DOWN" : "",
  );
  const [isReviewDeleted, setIsReviewDeleted] = useState(false);
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
  const handleDeleteButton = () => {
    fetch(`${BASE_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.message);
        }
        setIsReviewDeleted(true);
      })
      .catch((e) => setError(e.message));
  };

  const reviewValidations = {
    title: {
      validate: (value) => value.length >= 2 && value.length <= 255,
      errorMessage: 'Expected string with length in the range [2-255]',
    },
    content: {
      validate: (value) => value.length >= 2,
      errorMessage: 'Expected string with length more than 2 characters',
    },
    rating: {
      validate: (value) => /^[1-5]$/.test(value),
      errorMessage: `Expected a whole number in the range [0 - 5]`,
    },
  };
  let dataToUpdate = {};
  const updateReviewProp = (element) => {
    dataToUpdate = { ...dataToUpdate, ...element };
    if (element.rating) {
      setRatings(element.rating);
    }
  };

  const handleEditButton = () => {
    // setLoading(true);
    const isValid = Object.keys(dataToUpdate).every(key => reviewValidations[key].validate(dataToUpdate[key]));

    if (isValid) {
      fetch(`${BASE_URL}/reviews/${reviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToUpdate),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.error) {
            throw new Error(result.message);
          }
          // setRatings(dataToUpdate.rating);
          setContents(dataToUpdate.content);
          setTitles(dataToUpdate.title);
          setEditMode(false);
        })
        .catch((e) => setError(e.message));
      // .finally(() => setLoading(false));
    }
  };
  const cancelEdit = () => {
    setEditMode(false);
    setRatings(rating);
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  return !isReviewDeleted ? (
    <div
      id={
        authorId === userId
          ? "review-card-detailed-current-user"
          : "review-card-detailed-regular"
      }
    >
      <div id="review-card-user-edit">
        <div id="review-card-user-info">
          <img
            src={`${BASE_URL}/${avatar}`}
            id="review-user-avatar"
            alt="user avatar"
          />
          <div id="review-card-username">{username}</div>
        </div>
        {authorId === userId ? (
          <div id="review-card-edit-delete">
            {editMode ? (
              <button
                id="review-edit-button"
                type="button"
                onClick={() => handleEditButton()} // to change
              >
                <img
                  src={`${BASE_URL}/storage/icons/save-icon.png`}
                  id="review-edit-icon"
                  alt="edit save review"
                />
              </button>
            ) : null}
            {!editMode ? (
              <button
                id="review-edit-button"
                type="button"
                onClick={() => setEditMode(true)}
              >
                <img
                  src={`${BASE_URL}/storage/icons/edit-icon.svg`}
                  id="review-edit-icon"
                  alt="edit review"
                />
              </button>
            ) : (
              <button
                id="review-edit-button"
                type="button"
                onClick={() => cancelEdit()}
              >
                <img
                  src={`${BASE_URL}/storage/icons/x-icon.png`}
                  id="review-edit-icon"
                  alt="cancel-edit review"
                />
              </button>
            )}
            <button
              id="review-delete-button"
              type="button"
              onClick={() => handleDeleteButton()}
            >
              <img
                src={`${BASE_URL}/storage/icons/delete-icon.png`}
                id="review-delete-icon"
                alt="delete review"
              />
            </button>
          </div>
        ) : null}
      </div>
      <div id="review-card-rating-title">
        <div id="review-card-rating">
          {editMode
            ? (
              <StarRatings
                rating={ratings}
                starRatedColor="orange"
                id="create-review-rating"
                starDimension="25px"
                starSpacing="1px"
                numberOfStars={5}
                name="rating"
                changeRating={(r) => updateReviewProp({ "rating": r })}
                isSelectable="true"
              />
            )
            : <BookCardRating bookRating={ratings || 0} />}
        </div>
        {editMode ? (
          <input
            type="text"
            id="review-card-title"
            placeholder={title}
            onChange={(e) => updateReviewProp({ 'title': e.target.value })}
            name="review-title"
          />
        ) : (
          <div id="review-card-title">{titles}</div>
        )}
      </div>
      <div id="review-card-dates">
        <div id="review-card-date-created">
          {`Date created: ${new Date(dateCreated).toLocaleDateString("en-US")}`}
        </div>
        <div id="review-card-date-updated">
          {dateEdited && `Date edited: ${new Date(dateEdited).toLocaleDateString("en-US")}`}
        </div>
      </div>
      {editMode ? (
        <div>
          <input
            type="text"
            id="review-card-content"
            placeholder={content}
            onChange={(e) => updateReviewProp({ 'content': e.target.value })}
            name="review-content"
          />
          {dataToUpdate.content && reviewValidations.content.validate(dataToUpdate.content) ? null : (<span>{reviewValidations.content.errorMessage}</span>) }
        </div>
      ) : (
        <div id="review-card-content">
          {content.length > 300 ? (
            <ShowMoreButton breakpoint={300} text={contents} />
          ) : (
            content
          )}
        </div>
      )}
      <div id="review-card-thumbs">
        <img
          onClick={
            currentVote === "" || currentVote === "DOWN"
              ? () => handleVoteButton("PUT", "THUMBS_UP")
              : () => handleVoteButton("DELETE", "THUMBS_UP")
          }
          src={`${BASE_URL}/storage/icons/thumbUp.png`}
          id={
            currentVote === "UP"
              ? "review-img-thumbs-up-active"
              : "review-img-thumbs-up-inactive"
          }
          alt="thumbs up"
        />
        <div id="review-card-thumb">{countThumbsUp || 0}</div>
        <img
          onClick={
            currentVote === "" || currentVote === "UP"
              ? () => handleVoteButton("PUT", "THUMBS_DOWN")
              : () => handleVoteButton("DELETE", "THUMBS_DOWN")
          }
          src={`${BASE_URL}/storage/icons/thumbDown.png`}
          id={
            currentVote === "DOWN"
              ? "review-img-thumbs-down-active"
              : "review-img-thumbs-down-inactive"
          }
          alt="thumbs down"
        />
        <div id="review-card-thumb">{countThumbsDown || 0}</div>
      </div>
    </div>
  ) : null;
};
ReviewCard.defaultProps = {
  rating: 0,
  dateEdited: "N/A",
  thumbsUp: 0,
  thumbsDown: 0,
  userThumbsUpList: "",
  userThumbsDownList: "",
};
ReviewCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  rating: PropTypes.number,
  title: PropTypes.string.isRequired,
  dateCreated: PropTypes.string.isRequired,
  dateEdited: PropTypes.string,
  content: PropTypes.string.isRequired,
  reviewId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  thumbsUp: PropTypes.number,
  thumbsDown: PropTypes.number,
  userThumbsUpList: PropTypes.string,
  userThumbsDownList: PropTypes.string,
};

export default ReviewCard;
