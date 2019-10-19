import React, { useGlobal } from "reactn";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
// import NotFound from './pages/NotFound';
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import SignUp from "./pages/SignUp";
import User from "./pages/User";
import ShoppingList from "./pages/ShoppingList";
import Schedule from "./pages/Schedule";

const NavBar = () => {
  const [token, setToken] = useGlobal("token");

  const logout = () => {
    setToken(null);
  };

  return (
    <nav className="card1">
      <ul>
        <li>
          <Link type="li" to="/">
            Home
          </Link>
        </li>

        {!token && (
          <>
            <li>
              <Link type="li" to="/login">
                Login
              </Link>
            </li>

            <li>
              <Link type="li" to="/sign-up">
                Sign-up
              </Link>
            </li>
          </>
        )}
        {token && (
          <>
            <li>
              <Link type="li" to="/profile">
                Profile
              </Link>
            </li>
            <li>
              <Link type="li" to="/schedule">
                Schedule
              </Link>
            </li>

            <li>
              <Link type="li" to="/ShoppingList">
                ShoppingList
              </Link>
            </li>
            <li>
              <Link type="li" onClick={logout} to="#">
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <h1 className="header1">farm assistant </h1>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/user/:userId" component={User} />
        <PrivateRoute path="/profile" component={Profile} />
        {/* <Route component={NotFound} /> */}
        <Route path="/ShoppingList" component={ShoppingList} />
        <Route path="/Schedule" component={Schedule} />
      </Router>
    </>
  );
}

export default App;
