import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

/** Homepage of site. Show welcome message or login/register buttons. */
function Homepage() {
  const { currentUser } = useContext(UserContext);
  console.debug("Homepage", "currentUser=", currentUser);

  return (
      <div className="Homepage">
        <div className="container text-center border border-dark rounded"
          style={{margin: '10px, 20px, 10px, 10px', 
          padding: '10px', 
          background: 'rgba(255,255,255,0.5)'}}
        >
          <h1 className="mb-4 font-weight-bold">CineRator</h1>
          <p className="lead">All the movies in one convenient place.</p>
          <p>Our site is still under construction, But feel free to search your favorite movies and tell us what you think!</p>
          {currentUser
              ? <h2>
                Welcome Back, {currentUser.username}!
              </h2>
              : (
                  <p>
                    <Link className="btn btn-primary font-weight-bold mr-3"
                          to="/login">
                      Log in
                    </Link>
                    &nbsp; or &nbsp;
                    <Link className="btn btn-primary font-weight-bold"
                          to="/signup">
                      Sign up
                    </Link>
                  </p>
              )}
          <p>Please remember to remain respectful in the comments!</p>
        </div>
      </div>
  );
}

export default Homepage;