import React from 'react';

function CommentsShow() {

let sampleComments = {
    "comments": [
        {
        "id": 1,
        "comment": "This is a great movie!",
        "movie_id": 1,
        "user_id": 1,
				"rating": "5 stars",
				'username': 'user1'
        },
        {
        "id": 2,
        "comment": "This is a terrible movie!",
        "movie_id": 1,
        "user_id": 2,
				"rating": "1 star",
				'username': 'user2'
        },
        {
        "id": 3,
        "comment": "I love this movie!",
        "movie_id": 1,
        "user_id": 3,
				"rating": "4 stars",
				'username': 'user3'
        }
    ]
}

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