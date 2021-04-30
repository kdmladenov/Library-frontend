import {
  BrowserRouter, Route, Switch, Redirect,
} from "react-router-dom";
import Books from "./components/Books/Books";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import UserTimeline from "./containers/User/UserTimeline";
import UserProfile from "./containers/User/UserProfile";
import UserChangePassword from "./containers/User/UserChangePassword";
import NotFound from "./components/ErrorPages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Redirect path="/" exact to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/user/timeline" component={UserTimeline} />
        <Route path="/user/profile" component={UserProfile} />
        <Route path="/user/changePassword" component={UserChangePassword} />
        <Route path="/books" component={Books} />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
