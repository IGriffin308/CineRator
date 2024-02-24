import React from 'react';
import { useState, useEffect } from 'react';
import CineratorApi from "../api/api";
import Alert from "../common/Alert";
import LoadingSpinner from "../common/LoadingSpinner";

/** Show all comments for Movie */

function CommentsShow({ movieId }) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function getComments(movieId) {
      try {
        let res = await CineratorApi.getCommentsByMovie(movieId);
        setComments(res);
        setIsLoading(false);
      } catch (errors) {  
        setError(errors);
        setIsLoading(false);
        return { success: false, errors };
      }
    }
    getComments(movieId);
    console.log(comments);
  }, [movieId]);
  

  if (isLoading) {
    return (<LoadingSpinner />);
  }
  if (error) {
    return (<Alert type="danger" messages={error} />);
  }
  return (
    <div>
      <h3>Comments</h3>
        <div>
            {comments.map((comment) => (
            <div 
							key={comment.id} 
							className="container border border-dark rounded"
							style={{margin: '10px', padding: '10px', background: 'rgba(255,255,255,0.5)'}}
						>
								<h4>{comment.username}</h4>
                <p>{comment.comment}</p>
            </div>
            ))}
				</div>
    </div>
  );
}

export default CommentsShow;