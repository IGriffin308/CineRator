import React from 'react';
import MoviePlaque from './MoviePlaque';
import CommentAdd from './CommentAdd';
import CommentsShow from './CommentsShow';


function MovieFull() {
  return (
    <div className="container">
      <MoviePlaque />
      <div className="container border border-dark rounded">
        <CommentAdd />
        <CommentsShow />
      </div>
    </div>
  );
}

export default MovieFull;