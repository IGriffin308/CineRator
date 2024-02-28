import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CineratorApi from '../api/api';
import testmovie1 from "../testmovie1";
import UserContext from "../auth/UserContext";

/** Form to add comment to movie */

function CommentAdd({ movieId }) {
  const [comment, setComment] = useState("");
  const { currentUser } = useContext(UserContext);
  const history = useHistory();

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  // Submit form and reload page
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      user_id: currentUser.id,
      movie_id: movieId,
      username: currentUser.username,
      comment: comment,
    }
    CineratorApi.addComment(data);
    history.go(0);
  }

  return (
    <div>
      <h3>Add Comment</h3>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label style={{width: "100%"}}>
            <textarea 
              name="comment" 
              // cols="36" 
              rows="5" 
              maxlength="500"
              placeholder="Add Comment" 
              style={{width: "100%", padding: "10px"}}
              value={comment} 
              onChange={handleChange} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default CommentAdd;