/* eslint-disable react/jsx-props-no-spreading */
import { withRouter } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import PropTypes from "prop-types";
import "react-multi-carousel/lib/styles.css";
import BookCard from "./BookCard";
import "./books.css";
import { bookCarouselBreakpoints } from "../../common/carousel";
import Loading from "../UI/Loading";
import useHttp from '../../hooks/useHttp';
import { BASE_URL } from '../../common/constants';

function BookCarousel(props) {
  const { title } = props;

  const { data, loading, error } = useHttp(
    `${BASE_URL}/books`,
    "GET",
    [],
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  const bookCardsToShow = data.map((book) => {
    return (
      <BookCard
        key={book.bookId}
        {...book}
        // eslint-disable-next-line react/prop-types
        goToDetails={() => props.history.push(`/books/${book.bookId}`)}
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
      ;
    </div>
  );
}

BookCarousel.propTypes = {
  title: PropTypes.string.isRequired,
};

export default withRouter(BookCarousel);
