import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./NavBar.css";
import SearchBar from '../componentsHelpers/SearchBar';
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';

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
      <Navbar expand="lg" fixed="top" 
        style={{background: 'linear-gradient(180deg, rgba(74, 109, 155,1) 50%, rgba(38,54,59,1) 100%)'}}
      >
        <Navbar.Brand className="custom-logo">
          <NavLink to="/">
            <span style={{color: '#ffc700', fontSize: "30px"}}>
              ★
            </span>
            CineRator
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{marginLeft: 'auto'}}>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="custom-box">
                  User Menu
              </Dropdown.Toggle>
              <Dropdown.Menu style={{background:"rgb(84, 112, 149)"}}>
                {/* <Dropdown.Item> */}
                  <Nav.Item className="custom-box">
                    <NavLink to="/userpage" className="custom-link">
                      User Page
                    </NavLink>
                  </Nav.Item>
                {/* </Dropdown.Item> */}
                {/* <Dropdown.Item> */}
                  <Nav.Item className="custom-box">
                    <Link to="/" onClick={logout} className="custom-link">
                      Log out
                    </Link>
                  </Nav.Item>
                {/* </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Item className="custom-box custom-search">
              <SearchBar />
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    // </nav>
    )
  }

  // If user is not logged in, show links to login and signup routes
  function loggedOutNav() {
    return (
      <Navbar expand="lg" fixed="top" 
        style={{background: 'linear-gradient(180deg, rgba(74, 109, 155,1) 50%, rgba(38,54,59,1) 100%)'}}
      >
      <Navbar.Brand className="custom-logo">
        <NavLink to="/">
          <span style={{color: '#ffc700', fontSize: "30px"}}>
            ★
          </span>
          CineRator
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" style={{marginLeft: 'auto'}}>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} className="custom-box">
              User Menu
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item> */}
                <Nav.Item className="custom-box">
                  <NavLink to="/login" className="custom-link">
                    Log In
                  </NavLink>
                </Nav.Item>
              {/* </Dropdown.Item> */}
              {/* <Dropdown.Item> */}
                <Nav.Item className="custom-box">
                  <NavLink to="/signup" className="custom-link">
                    Sign Up
                  </NavLink>
                </Nav.Item>
              {/* </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
          <Nav.Item className="custom-box custom-search">
            <SearchBar />
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
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