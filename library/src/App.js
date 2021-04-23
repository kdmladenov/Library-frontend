import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar/Navbar';
// import LoginForm from './components/Forms/LoginForm';
// import RegistryForm from './components/Forms/RegistryForm';
import NotFound from './components/ErrorPages/NotFound';
import Forbidden from './components/ErrorPages/Forbidden';
import ServiceUnavailable from './components/ErrorPages/ServiceUnavailable';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      {/* <LoginForm /> */}
      {/* <RegistryForm /> */}
      <NotFound />
      <Forbidden />
      <ServiceUnavailable />
    </div>
  );
}

export default App;
