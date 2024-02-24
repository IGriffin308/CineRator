import React from 'react';
import { useContext } from 'react';
import MoviePlaque from './MoviePlaque';
import CommentAdd from './CommentAdd';
import CommentsShow from './CommentsShow';
import RateFav from './RateFav';
import { useLocation } from 'react-router-dom';
import UserContext from "../auth/UserContext";
import Alert from "../common/Alert";

// Custom hook to get query params from URL
function useQuery() {
  const { search } = useLocation();
  
  return React.useMemo(() => new URLSearchParams(search), [search]);
}


/** Show full movie details and comments 
 * if user is logged in, show comment form, else show comments only
*/
function MovieFull() {
  const { currentUser } = useContext(UserContext);

  let query = useQuery();
  let movieId = query.get("Id");

  // If user is logged in, show comment form
  function loggedInPage() {
    return (
      <div className="container">
        <MoviePlaque movieId={ movieId }/>
        <RateFav movieId={ movieId }/>
        <div className="container border border-dark rounded">
          <CommentAdd movieId={ movieId }/>
          <CommentsShow movieId={ movieId }/>
        </div>
      </div>
    );
  }

  // If user is not logged in, show comments only
  function loggedOutPage() {
    return (
      <div className="container">
        <MoviePlaque movieId={ movieId }/>
        <div className="container border border-dark rounded">
          <CommentsShow movieId={ movieId }/>
        </div>
      </div>
    );
  }

  // If movieId is missing or invalid, show error
  if (!movieId) {
    return (
      <div className="container">
        <Alert type="danger" messages={["Invalid or missing movie ID"]} />
      </div>
    );
  }

  // If user is logged in, show comment form, else show comments only
  return (
    <div>
      {currentUser ? loggedInPage() : loggedOutPage()}
    </div>
  );
}

export default MovieFull;