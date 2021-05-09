import './Home.css';
import BookCarousel from '../Books/BookCarousel';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/home.jpg)` }}>
        <div className="greeting">
          <h1>WELCOME TO</h1>
          <h1>BETWEEN THE PAGES</h1>
        </div>
      </div>
      <BookCarousel title="Most Popular Books" />
      <BookCarousel title="New Releases" />
      <BookCarousel title="Top Rated Books" />
    </div>
  );
};

export default Home;
