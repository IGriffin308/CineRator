"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {NotFoundError} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** SQL functions for comments. */
class Comments {

  static async post({
    user_id,
    movie_id,
    username,
    comment = null,
  }) {
    const result = await db.query(
      `INSERT INTO comments
        (user_id, movie_id, username, comment)
        VALUES ($1, $2, $3, $4)
        RETURNING id, comment`,
      [
        user_id,
        movie_id,
        username,
        comment,
      ],
    );
    const commentData = result.rows[0];
    
    console.log("commentData", commentData);
    return commentData;
  }

  static async get(commentId) {
    const commentsRes = await db.query(
      `SELECT id,
              comment,
              username,
         FROM comments
         WHERE id = $1`,
        [commentId],
    );
    
    const comment = commentsRes.rows[0];
    
    if (!comment) throw new NotFoundError(`No user: ${username}`);
    
    return comment;
  }


  static async getAllForMovie(movieId) {
    const result = await db.query(
      `SELECT id,
              user_id,
              movie_id,
              username,
              comment
       FROM comments
       WHERE movie_id = $1
       ORDER BY id`,
       [movieId]
    );

    return result.rows;
  }

  static async getAllForUser(userId) {
    const result = await db.query(
      `SELECT id,
              user_id,
              movie_id,
              username,
              comment,
       FROM comments
       WHERE user_id = $1
       ORDER BY id`,
      [userId]
    );

    return result.rows;
  }

  static async update(commentId, data) {
    const { setCols, values } = sqlForPartialUpdate(
      data,
      {
        comment: "comment"
      });
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE comments
                      SET ${setCols}
                      WHERE id = ${idVarIdx}
                      RETURNING id,
                                comment`;
    const result = await db.query(querySql, [...values, commentId]);
    const comment = result.rows[0];

    if (!comment) throw new NotFoundError(`No comment: ${commentId}`);

    return comment;
  }

  static async remove(commentId) {
    const result = await db.query(
      `DELETE
       FROM comments
       WHERE id = $1
       RETURNING id`,
      [commentId]);
    const comment = result.rows[0];

    if (!comment) throw new NotFoundError(`No comment: ${commentId}`);
  }

  static async checkIfCommentExists(userId, movieId) {
    const result = await db.query(
      `SELECT id
       FROM comments
       WHERE user_id = $1 AND movie_id = $2`,
      [userId, movieId]
    );
    return result.rows[0];
  }
}

module.exports = Comments;