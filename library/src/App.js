import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar/Navbar";
// import LoginForm from './components/Forms/LoginForm';
import BookCarousel from "./components/Books/BookCarousel";

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <div className="home-container">
        <BookCarousel title="Most Popular Books" />
        <BookCarousel title="New Releases" />
        <BookCarousel title="Top Rated Books" />
      </div>
      {/* <LoginForm /> */}
    </div>
  );
}

export default App;
