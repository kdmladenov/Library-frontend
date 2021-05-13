/* eslint-disable react/jsx-props-no-spreading */
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
import NotFound from "./components/StaticPages/NotFound";
import Forbidden from "./components/StaticPages/Forbidden";
import ServiceUnavailable from "./components/StaticPages/ServiceUnavailable";
import TermsAndPolicy from "./components/TermsAndPolicy/TermsAndPolicy";
import AuthContext, { getUser } from "./providers/AuthContext";
import GuardedRoute from "./providers/GuardedRoute";
import Logout from "./components/StaticPages/Logout";
import UserContainer from './containers/User/UserContainer';
import CreateBook from './components/Admin/CreateBook';
import UpdateBook from './components/Admin/UpdateBook';
import Users from './containers/User/Users';

const App = () => {
  const [authValue, setAuthValue] = useState({
    isLoggedIn: !!getUser(),
    user: { ...getUser() },
  });

  const { isLoggedIn, user } = authValue;

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
          <Route path="/logout" exact render={() => <Logout message1="You have successfully logged out." message2="Thank You for visiting our site. We hope to see again soon!" buttonText="LOGIN AGAIN" linkTo="/login" />} />
          <Route path="/unregister" exact render={() => <Logout message1="You have successfully deleted Your Account" message2="Thank You for using our site. We hope to see again soon!" buttonText="CREATE NEW ACCOUNT" linkTo="/register" />} />
          <GuardedRoute
            path="/user"
            exact
            component={(props) => <UserContainer {...props} defaultContent="timeline" />}
            isLoggedIn={isLoggedIn}
          />
          <GuardedRoute
            path="/users"
            exact
            component={Users}
            isLoggedIn={isLoggedIn}
          />
          <GuardedRoute
            path="/users/:userId"
            exact
            component={(props) => <UserContainer {...props} defaultContent="profile" />}
            isLoggedIn={isLoggedIn && user.role === 'admin'}
          />
          <GuardedRoute
            path="/books"
            exact
            component={Books}
            isLoggedIn={isLoggedIn}
          />
          <GuardedRoute
            path="/books/create"
            exact
            component={CreateBook}
            isLoggedIn={isLoggedIn && user.role === 'admin'}
          />
          <GuardedRoute
            path="/books/:id/update"
            exact
            component={UpdateBook}
            isLoggedIn={isLoggedIn && user.role === 'admin'}
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
