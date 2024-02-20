import React from 'react';
import testmovie1 from "../testmovie1";
import sampleComments from "../testcomments1";
import CineratorApi from "../api/api";

function CommentsShow({ title }) {

  let movieArr = Object.values(testmovie1);

  let comments
  async function getComments() {
    comments = await CineratorApi.getCommentsByTitle(movieArr[0]);
    console.log(comments);
  }
  getComments();

  return (
    <div>
      <h3>Comments</h3>
        <div>
            {sampleComments.comments.map((comment) => (
            <div 
							key={comment.id} 
							className="container border border-dark rounded"
							style={{margin: '10px', padding: '10px', background: 'rgba(255,255,255,0.5)'}}
						>
								<h4>{comment.username}</h4>
								<p>{comment.rating}</p>
                <p>{comment.comment}</p>
            </div>
            ))}
				</div>
    </div>
  );
}

export default CommentsShow;