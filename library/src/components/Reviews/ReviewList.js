/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../common/constants";
import { getToken } from "../../providers/AuthContext";
import Loading from "../UI/Loading";
import ReviewCard from "./ReviewCard";

const ReviewsList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getToken();

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
  }, []);

  if (loading) {
    return (
      <div>
        <Loading>
          <h1>Loading books...</h1>
        </Loading>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Loading>
          <h1>error...</h1>
        </Loading>
      </div>
    );
  }
  const reviewCardsToShow = reviews.map((review) => {
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <ReviewCard key={review.reviewId} {...review} />
    );
  });

  return (
    <div className="review-container">
      {reviews.length ? (
        <ul>{reviewCardsToShow}</ul>
      ) : (
        <div>There are no reviews yet.</div>
      )}
    </div>
  );
};

export default ReviewsList;
