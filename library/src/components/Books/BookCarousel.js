import Carousel from "react-multi-carousel";
import PropTypes from "prop-types";
import "react-multi-carousel/lib/styles.css";
import booksData from "../../data/booksData";
import BookCard from "./BookCard";
import "./books.css";

function BookCarousel({ title }) {
  const responsive = {
    desktopMax: {
      breakpoint: { max: 3000, min: 1080 },
      items: 7,
      slidesToSlide: 7, // optional, default to 1.
    },
    desktopHigh: {
      breakpoint: { max: 1080, min: 925 },
      items: 6,
      slidesToSlide: 6, // optional, default to 1.
    },
    desktopMid: {
      breakpoint: { max: 925, min: 771 },
      items: 5,
      slidesToSlide: 5, // optional, default to 1.
    },
    desktopMin: {
      breakpoint: { max: 771, min: 617 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 617, min: 464 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
  };

  const bookCardsToShow = booksData.map((book) => {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <BookCard key={book.bookId} {...book} />;
  });

  return (
    <div className="book-carousel">
      <h5 id="carousel-title">{title}</h5>
      <Carousel
        swipeable="true"
        draggable="true"
        showDots="true"
        responsive={responsive}
        ssr="true" // means to render carousel on server-side.
        infinite="true"
        autoPlay={false}
        // autoPlaySpeed={1000}
        keyBoardControl="true"
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        // deviceType={this.props.deviceType}
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

export default BookCarousel;
