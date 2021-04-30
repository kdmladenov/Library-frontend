import BookCarousel from '../Books/BookCarousel';

const Home = () => {
  return (
    <div className="home-container">
      <BookCarousel title="Most Popular Books" />
      <BookCarousel title="New Releases" />
      <BookCarousel title="Top Rated Books" />
    </div>
  );
};

export default Home;
