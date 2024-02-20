import React from 'react';
import MoviePlaque from './MoviePlaque';
import CommentAdd from './CommentAdd';
import CommentsShow from './CommentsShow';


function MovieFull({ title }) {
  return (
    <div className="container">
      <MoviePlaque title={ title }/>
      <div className="container border border-dark rounded">
        <CommentAdd title={title}/>
        <CommentsShow title={title}/>
      </div>
    </div>
  );
}

export default MovieFull;