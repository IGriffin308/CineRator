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
  
  // If user is logged in, show links to userpage and logout routes
  // function loggedInNav() {
  //   return (
  //     <div className="container-fluid">
  //       <nav 
  //         className="navbar navbar-expand-lg navbar-dark fixed-top" 
  //         style={{background: 'linear-gradient(180deg, rgba(74, 109, 155,1) 50%, rgba(38,54,59,1) 100%)'}}
  //       >
  //         <span className="custom-logo">
  //           <NavLink to="/">CineRator</NavLink>
  //         </span>
  //         {/* <div className="nav-item dropdown">
  //           <a className="navlink dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  //           Dropdown  
  //           </a>
  //           <div className="dropdown-menu" aria-labelledby="navbarDropdown"> 
  //             <a className="dropdown-item" href="#">
  //               <SearchBar />
  //             </a>
  //             <div className="dropdown-divider"></div>
  //             <a className="dropdown-item" href="#">
  //               <NavLink to="/userpage">User Page</NavLink>
  //             </a>
  //             <a className="dropdown-item" href="#">
  //               <Link to="/" onClick={logout}>
  //                 Log out
  //               </Link>
  //             </a>
  //           </div>
  //          */}
  //         <ul className="nav-item list-group list-group-horizontal ">
  //           <li className="list-group-item">
  //             <SearchBar />
  //           </li>
  //           <li className="list-group-item">
  //             <NavLink to="/userpage">User Page</NavLink>
  //           </li>
  //           <li className="list-group-item">
  //             <Link to="/" onClick={logout}>
  //               Log out
  //             </Link>
  //           </li>
  //         </ul>

  //       </nav>
  //     </div>
  //   );
  // }

  function loggedInNav() {
    return (
    // <nav 
    //   className="navbar navbar-expand-lg navbar-dark fixed-top" 
    //   style={{background: 'linear-gradient(180deg, rgba(74, 109, 155,1) 50%, rgba(38,54,59,1) 100%)'}}
    // >
      <Navbar expand="lg" fixed="top" 
        style={{background: 'linear-gradient(180deg, rgba(74, 109, 155,1) 50%, rgba(38,54,59,1) 100%)'}}
      >
        <Navbar.Brand className="custom-logo">
          <NavLink to="/">
            <span style={{ 
              color: '#ffc700', fontSize: "30px"
            }}>★</span>
            CineRator
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" style={{marginLeft: 'auto'}}>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} 
                style={{border: 'solid 2px', borderRadius: '5px', padding: '5px', background: 'rgba(255,255,255,0.5)'}}
              >User Menu</Dropdown.Toggle>
              <Dropdown.Menu>
                {/* <Dropdown.Item> */}
                  <Nav.Item>
                    <NavLink to="/userpage">User Page</NavLink>
                  </Nav.Item>
                {/* </Dropdown.Item> */}
                {/* <Dropdown.Item> */}
                  <Nav.Item>
                    <Link to="/" onClick={logout}>
                      Log out
                    </Link>
                  </Nav.Item>
                {/* </Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
            <Nav.Item style={{ border: 'solid 2px', borderRadius: '5px', padding: '1px', paddingTop: '3px', background: 'rgba(255,255,255,0.5)' }}>
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
          <span style={{ 
            color: '#ffc700', fontSize: "30px"
          }}>★</span>
          CineRator
        </NavLink>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" style={{marginLeft: 'auto'}}>
          <Dropdown as={Nav.Item}>
            <Dropdown.Toggle as={Nav.Link} 
              style={{border: 'solid 2px', borderRadius: '5px', padding: '5px', background: 'rgba(255,255,255,0.5)'}}
            >User Menu</Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item> */}
                <Nav.Item>
                  <NavLink to="/login">Log In</NavLink>
                </Nav.Item>
              {/* </Dropdown.Item> */}
              {/* <Dropdown.Item> */}
                <Nav.Item>
                  <NavLink to="/signup">Sign Up</NavLink>
                </Nav.Item>
              {/* </Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
          <Nav.Item style={{ border: 'solid 2px', borderRadius: '5px', padding: '1px', paddingTop: '3px', background: 'rgba(255,255,255,0.5)' }}>
            <SearchBar />
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
      // <div className="container-fluid">
      //   <nav 
      //     className="navbar navbar-expand-lg navbar-dark fixed-top" 
      //     style={{background: 'linear-gradient(180deg, rgba(74, 109, 155,1) 50%, rgba(38,54,59,1) 100%)'}}
      //   >
      //     <span className="custom-logo">
      //       <NavLink to="/">CineRator</NavLink>
      //     </span>
      //     <ul className="navbar-nav mr-auto mt-2 mt-lg-0 list-group list-group-horizontal">
      //       <li className="list-group-item">
      //         <SearchBar />
      //       </li>
      //       <li className="list-group-item">
      //         <NavLink to="/login">Login</NavLink>
      //       </li>
      //       <li className="list-group-item">
      //         <NavLink to="/signup">Sign Up</NavLink>
      //       </li>
      //     </ul>
      //   </nav>
      // </div>

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