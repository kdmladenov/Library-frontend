/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import server from "../../common/server";
import ReviewsList from "../../components/Reviews/ReviewList";
import Loading from "../../components/UI/Loading";
import BookCardDetailed from "../../components/Books/BookCardDetailed";

const IndividualBook = (props) => {
  const [bookData, setBookData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // eslint-disable-next-line react/destructuring-assignment
  const { id } = props.match.params;
  // eslint-disable-next-line no-console
  useEffect(() => {
    setLoading(true);

    fetch(`${server.baseURL}/books/${id}`, {
      headers: {
        Authorization: server.headers.Authorization,
      },
    })
      .then((response) => response.json())
      .then((result) => setBookData(result))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

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
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    bookData && (
      <div>
        <BookCardDetailed {...bookData} />
        <hr />
        <ReviewsList {...bookData} />
      </div>
    )
  );
};

export default IndividualBook;
