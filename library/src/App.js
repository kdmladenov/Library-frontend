// import BookCarousel from "./components/Books/BookCarousel";
// import BookDetailedView from "./components/Books/BookDetailedView";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar/Navbar";
import UserContainer from './components/Users/UserContainer';
// import UserAccount from './components/Users/UserAccount';
// import ChangePassword from './components/Users/ChangePassword';
// import EditProfile from './components/Users/EditProfile';
// import UserHistory from './components/Users/UserHistory';
// import LoginForm from './components/Forms/LoginForm';
// import RegistryForm from './components/Forms/RegistryForm';
// import NotFound from './components/ErrorPages/NotFound';
// import Forbidden from './components/ErrorPages/Forbidden';
// import ServiceUnavailable from './components/ErrorPages/ServiceUnavailable';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      {/* <div className="home-container">
        <BookCarousel title="Most Popular Books" />
        <BookCarousel title="New Releases" />
        <BookCarousel title="Top Rated Books" />
      </div>
      <div className="book-detailed-container">
        <BookDetailedView />
      </div> */}
      {/* <LoginForm /> */}
      {/* <RegistryForm /> */}
      {/* <NotFound />
      <Forbidden />
      <ServiceUnavailable /> */}
      {/* <UserAccount>
        <ChangePassword />
      </UserAccount>
      <UserAccount>
        <EditProfile />
      </UserAccount> */}
      {/* <UserAccount>
        <UserHistory />
      </UserAccount> */}
      <UserContainer />
    </div>
  );
}

export default App;
