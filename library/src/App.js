import { useState } from "react";
import {
  BrowserRouter, Route, Switch, Redirect,
} from "react-router-dom";
import Books from "./containers/Book/Books";
import IndividualBook from "./containers/Book/IndividualBook";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Login from "./components/Forms/Login";
import Register from "./components/Forms/Register";
import UserTimeline from "./containers/User/UserTimeline";
import UserProfile from "./containers/User/UserProfile";
import UserChangePassword from "./containers/User/UserChangePassword";
import NotFound from "./components/StaticPages/NotFound";
import Forbidden from "./components/StaticPages/Forbidden";
import ServiceUnavailable from "./components/StaticPages/ServiceUnavailable";
import TermsAndPolicy from "./components/TermsAndPolicy/TermsAndPolicy";
import AuthContext, { getUser } from "./providers/AuthContext";
import GuardedRoute from "./providers/GuardedRoute";
import Logout from "./components/StaticPages/Logout";

const App = () => {
  const [authValue, setAuthValue] = useState({
    isLoggedIn: !!getUser(),
    user: getUser(),
  });

  const { isLoggedIn } = authValue;

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ ...authValue, setAuthValue }}>
        <Header />
        <Switch>
          <Redirect path="/" exact to="/home" />
          <Route path="/home" exact component={Home} />
          <Route path="/termsAndPolicy" exact component={TermsAndPolicy} />
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <GuardedRoute
            path="/user/timeline"
            exact
            component={UserTimeline}
            isLoggedIn={isLoggedIn}
          />
          <GuardedRoute
            path="/user/profile"
            exact
            component={UserProfile}
            isLoggedIn={isLoggedIn}
          />
          <GuardedRoute
            path="/user/changePassword"
            exact
            component={UserChangePassword}
            isLoggedIn={isLoggedIn}
          />
          <GuardedRoute
            path="/books"
            exact
            component={Books}
            isLoggedIn={isLoggedIn}
          />
          <GuardedRoute
            path="/books/:id"
            exact
            component={IndividualBook}
            isLoggedIn={isLoggedIn}
          />
          <Route path="/forbidden" exact component={Forbidden} />
          <Route path="/serviceUnavailable" exact component={ServiceUnavailable} />
          <Route path="*" exact component={NotFound} />
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
