/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import server from "../../common/server";
import ReviewsList from "../../components/Reviews/ReviewList";
import Loading from "../../components/UI/Loading";
import BookCardDetailed from "../../components/Books/BookCardDetailed";
import useHttp from '../../hooks/useHttp';

const IndividualBook = (props) => {
  const { id } = props.match.params;

  const { data, loading, error } = useHttp(
    `${server.baseURL}/books/${id}`,
  );

  if (loading) {
    return <Loading />;
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
    data && (
      <div>
        <BookCardDetailed {...data} />
        <hr />
        <ReviewsList {...data} />
      </div>
    )
  );
};

export default IndividualBook;
