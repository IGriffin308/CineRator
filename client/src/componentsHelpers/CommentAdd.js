import React from 'react';
import { useState, useEffect, useContext } from 'react';
import CineratorApi from '../api/api';
import testmovie1 from "../testmovie1";

function CommentAdd({ title }) {
  const [comment, setComment] = useState("");
  const [movieId, setMovieId] = useState(0);
  const [exists, setExists] = useState(false);
  const [commentId, setCommentId] = useState(0);
  const { currentUser } = useContext(UserContext);

  const handleChange = (e) => {
    setComment(e.target.value);
  }

  // let movieArr = Object.values(testmovie1);
  let movieArr

  useEffect(( title ) => {
    const getMovie = async () => {
      let res = await CineratorApi.getMovieByTitle(title);
      setMovieId(res.id);
      movieArr = Object.values(res);
      if (res) {
        let existRes = await CineratorApi.checkIfCommentExists(currentUser.id, res.id)
        setExists(existRes.exists);
        if (existRes.exists) {
          console.log("Comment exists");
          setCommentId(existRes.commentId);
        }
      }
    }
    getMovie();
  }, [title]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (exists) {
      console.log("exists");
      CineratorApi.editComment(
        commentId,
        data = {
          comment: comment,
        });
    }
    CineratorApi.addComment(
      // [ movieArr[18], comment ]
      id = movieId,
      data = {
        // 1, // user_id
        user_id: currentUser.id, // user_id
        // movieArr[18], // movie_id
        movie_id: movieId, // movie_id
        comment: comment, // comment
        // null, // rating
        // false, // favorite
      });
    console.log(comment);
  }

  return (
    <div>
      <h3>Add Comment</h3>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>
            <textarea 
              name="comment" 
              cols="40" 
              rows="5" 
              placeholder="Add Comment" 
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