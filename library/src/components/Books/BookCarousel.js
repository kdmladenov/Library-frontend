/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import Carousel from "react-multi-carousel";
import PropTypes from "prop-types";
import "react-multi-carousel/lib/styles.css";
import BookCard from "./BookCard";
import "./books.css";
import { bookCarouselBreakpoints } from "../../common/carousel";
import server from "../../common/server";
import Loading from "../UI/Loading";

function BookCarousel(props) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { title } = props;
  useEffect(() => {
    setLoading(true);

    fetch(`${server.baseURL}/books`, {
      method: "GET",
      headers: {
        Authorization: server.headers.Authorization,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.message);
        }
        setBooks(result);
      })
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
  const bookCardsToShow = books.map((book) => {
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
