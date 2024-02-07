import React from 'react';

function CommentAdd() {
  return (
    <div>
      <h3>Add Comment</h3>
      <div className="container">
        <form>
          <label>
            <textarea name="comment" cols="40" rows="5" placeholder="Add Comment" />
          </label>
          <br />
          <input type="submit" value="Submit" />
      </form>
      </div>
    </div>
  );
}

export default CommentAdd;