/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { BASE_URL, reviewValidation } from "../../common/constants";
import { getToken, getUser } from "../../providers/AuthContext";
import Loading from "../UI/Loading";
import ReviewCard from "./ReviewCard";
// import CreateReview from "./CreateReview";
import "./reviews.css";

const ReviewsList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [isReviewCreated, setIsReviewCreated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreateFormVisible, toggleCreateForm] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const token = getToken();
  const { userId, username } = getUser();
  const [form, setForm] = useState({
    title: {
      placeholder: "Place your review title here...",
      value: "",
      validations: {
        required: true,
        minLength: reviewValidation.MIN_TITLE_LENGTH,
        maxLength: reviewValidation.MAX_TITLE_LENGTH,
      },
      valid: false,
      touched: false,
    },
    content: {
      placeholder: "Place your review content here...",
      value: "",
      validations: {
        required: true,
        maxLength: reviewValidation.MAX_TITLE_LENGTH,
      },
      valid: false,
      touched: false,
    },
    rating: {
      placeholder: "Place your review rating here...",
      value: 0,
      validations: {
        required: true,
        minValue: 1,
        maxValue: 5,
      },
      valid: false,
      touched: false,
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = Object.keys(form).reduce((acc, elementKey) => {
      return {
        ...acc,
        [elementKey]: form[elementKey].value,
      };
    }, {});
    const updatedData = { ...data, rating: +data.rating };
    setLoading(true);

    fetch(`${BASE_URL}/books/${bookId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.message);
        }
        setIsReviewCreated(true);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  };

  const isInputValid = (input, validations) => {
    let isValid = true;

    if (validations.required) {
      isValid = isValid && input.length !== 0;
    }
    if (validations.minLength) {
      isValid = isValid && input.length >= validations.minLength;
    }
    if (validations.maxLength) {
      isValid = isValid && input.length <= validations.maxLength;
    }
    if (validations.minValue) {
      isValid = isValid && input >= validations.minValue;
    }
    if (validations.maxValue) {
      isValid = isValid && input <= validations.maxValue;
    }
    return isValid;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const updatedElement = { ...form[name] };
    updatedElement.value = value;
    updatedElement.touched = true;
    updatedElement.valid = isInputValid(value, updatedElement.validations);

    const updatedForm = { ...form, [name]: updatedElement };
    setForm(updatedForm);

    const formValid = Object.values(updatedForm).every((elem) => elem.valid);
    setIsFormValid(formValid);
  };

  useEffect(() => {
    setLoading(true);

    fetch(`${BASE_URL}/books/${bookId}/reviews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => setReviews(result))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [isReviewCreated]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const reviewCardsToShow = reviews.map((review) => {
    return <ReviewCard key={review.reviewId} {...review} />;
  });

  return (
    <div className="review-container">
      {(!isCreateFormVisible && !isReviewCreated && !reviews.find((r) => r.userId === userId)) ? <button type="button" id="create-review-show-btn" onClick={() => toggleCreateForm(true)}>Create review</button> : null}
      {(isCreateFormVisible && !isReviewCreated) ? (
        <form id="create-review-form" onSubmit={handleSubmit}>
          <div id="review-card-user-edit">
            <div id="crete-review-username">{username}</div>
            <button
              type="button"
              id="create-review-close-btn"
              onClick={() => toggleCreateForm(false)}
            >
              X
            </button>
          </div>
          <StarRatings
            rating={form.rating.value}
            starRatedColor="orange"
            id="create-review-rating"
            starDimension="25px"
            starSpacing="1px"
            numberOfStars={5}
            name="rating"
            changeRating={(rating) => handleInputChange({ target: { name: "rating", value: rating } })}
            isSelectable="true"
          />
          <input
            type="text"
            id="review-form-title"
            key="title"
            name="title"
            placeholder={form.title.placeholder}
            value={form.title.value}
            onChange={handleInputChange}
          />
          <input
            type="text"
            id="review-form-content"
            key="content"
            name="content"
            placeholder={form.content.placeholder}
            value={form.content.value}
            onChange={handleInputChange}
          />
          <button type="submit" disabled={!isFormValid}>
            Submit
          </button>
        </form>
      ) : null}
      {reviews.length ? (
        <ul>{reviewCardsToShow}</ul>
      ) : (
        <h2>There are no reviews yet. Click the button to write the first.</h2>
      )}
    </div>
  );
};

export default ReviewsList;
