import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./NavBar.css";
import SearchBar from '../componentsHelpers/SearchBar';

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
  
  // If user is logged in, show links to userpage and logout routes
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
          {/* <div className="nav-item dropdown">
            <a className="navlink dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Dropdown  
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown"> 
              <a className="dropdown-item" href="#">
                <SearchBar />
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                <NavLink to="/userpage">User Page</NavLink>
              </a>
              <a className="dropdown-item" href="#">
                <Link to="/" onClick={logout}>
                  Log out
                </Link>
              </a>
            </div>
           */}
          <ul className="nav-item list-group list-group-horizontal ">
            <li className="list-group-item">
              <SearchBar />
            </li>
            <li className="list-group-item">
              <NavLink to="/userpage">User Page</NavLink>
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

  // If user is not logged in, show links to login and signup routes
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
              <SearchBar />
            </li>
            <li className="list-group-item">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="list-group-item">
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  // Handle display of nav links depending on whether user is logged in
  return (
    <nav className="Navigation navbar navbar-expand-md">
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );

}

export default NavBar;