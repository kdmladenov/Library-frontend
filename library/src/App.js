import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar/Navbar';
import LoginForm from './components/Forms/LoginForm';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <LoginForm />
    </div>
  );
}

export default App;
