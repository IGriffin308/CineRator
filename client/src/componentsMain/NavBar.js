import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./NavBar.css";

/** Navigation bar for site. Shows up on every page.
 *
 * When user is logged in, shows links to main areas of site. When not,
 * shows link to Login and Signup forms.
 *
 * Rendered by App.
 */

function NavBar({ logout }) {
  const { currentUser } = useContext(UserContext);
  console.debug("Navigation", "currentUser=", currentUser);
  
  function loggedInNav() {
    return (
      <div className="container-fluid">
        <nav 
          className="navbar navbar-expand-lg navbar-dark fixed-top" 
          style={{background: 'linear-gradient(180deg, rgba(74, 109, 155,1) 50%, rgba(38,54,59,1) 100%)'}}
        >
          <span className="custom-logo">
            <NavLink to="/">CineRator</NavLink>
          </span>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 list-group list-group-horizontal">
            <li className="list-group-item">
              <NavLink to="/movie">Movie</NavLink>
            </li>
            <li className="list-group-item">
              <NavLink to="/userpage">User Page</NavLink>
            </li>
            <li className="list-group-item">
              <NavLink to="/search">Search</NavLink>
            </li>
            <li className="list-group-item">
              <Link to="/" onClick={logout}>
                Log out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  function loggedOutNav() {
    return (
      <div className="container-fluid">
        <nav 
          className="navbar navbar-expand-lg navbar-dark fixed-top" 
          style={{background: 'linear-gradient(180deg, rgba(74, 109, 155,1) 50%, rgba(38,54,59,1) 100%)'}}
        >
          <span className="custom-logo">
            <NavLink to="/">CineRator</NavLink>
          </span>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0 list-group list-group-horizontal">
            <li className="list-group-item">
              <NavLink to="/movie">Movie</NavLink>
            </li>
            <li className="list-group-item">
              <NavLink to="/search">Search</NavLink>
            </li>
            <li className="list-group-item">
              <NavLink to="/login-signup">Login/Signup</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  return (
    <nav className="Navigation navbar navbar-expand-md">
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );

}

export default NavBar;