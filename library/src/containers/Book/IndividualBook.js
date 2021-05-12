/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from "react";
import { useHistory } from 'react-router-dom';
import ReviewsList from "../../components/Reviews/ReviewList";
import Loading from "../../components/UI/Loading";
import BookCardDetailed from "../../components/Books/BookCardDetailed";
import useHttp from '../../hooks/useHttp';
import { BASE_URL } from '../../common/constants';

const IndividualBook = (props) => {
  const history = useHistory();
  const { id } = props.match.params;
  const { data, loading, error } = useHttp(
    `${BASE_URL}/books/${id}`,
  );

  if (loading) {
    return <Loading />;
  }

  if (error === '404') {
    history.push('*');
  } else if (error) {
    history.push('/serviceUnavailable');
  }
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    data && (
      <div>
        <BookCardDetailed {...data} />
        <ReviewsList {...data} />
      </div>
    )
  );
};

export default IndividualBook;
