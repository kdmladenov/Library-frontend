/* eslint-disable react/jsx-props-no-spreading */
import { withRouter, useHistory } from "react-router-dom";
import Carousel from "react-multi-carousel";
import PropTypes from "prop-types";
import 'react-multi-carousel/lib/styles.css';
import './BookCarousel.css';
import BookCard from "./BookCard";
import { bookCarouselBreakpoints } from "../../common/carousel";
import Loading from "../UI/Loading";
import useHttp from "../../hooks/useHttp";
import { BASE_URL } from "../../common/constants";
import { getUser } from '../../providers/AuthContext';

const BookCarousel = (props) => {
  const history = useHistory();
  const { title } = props;
  const isLoggedIn = !!getUser();

  let option = "";

  switch (title) {
    case "New Releases":
      option = isLoggedIn ? "?sort=bookId&order=desc" : "/public/newreleases";
      break;
    case "Top Rated Books":
      option = isLoggedIn ? "?sort=bookRating&order=desc" : "/public/toprated";
      break;
    case "Most Popular Books":
      option = isLoggedIn ? "?sort=bookRating&order=desc" : "/public/mostpopular";
      break;
    default:
      option = "";
  }

  const { data, loading, error } = useHttp(
    `${BASE_URL}/books${option}`,
    "GET",
    [],
  );

  if (loading) {
    return <Loading />;
  }

  if (error === '404') {
    history.push('*');
  } else if (error) {
    history.push('/serviceUnavailable');
  }

  const bookCardsToShow = data.map((book) => {
    return (
      <BookCard
        key={book.bookId}
        {...book}
        adminButtonsAreVisible={false}
        goToDetails={() => history.push(`/books/${book.bookId}`)}
      />
    );
  });

  return (
    <div className="book-carousel">
      <h5 id="carousel-title">{title}</h5>
      <Carousel
        responsive={bookCarouselBreakpoints}
        swipeable="true"
        draggable="true"
        showDots="true"
        renderDotsOutside
        ssr="true" // means to render carousel on server-side.
        infinite="true"
        autoPlay={false}
        keyBoardControl="true"
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {bookCardsToShow}
      </Carousel>
    </div>
  );
};

BookCarousel.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withRouter(BookCarousel);
