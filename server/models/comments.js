"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class Comments {
    /** authenticate user with username, password.
     *
     * Returns { username, is_admin }
     *
     * Throws UnauthorizedError is user not found or wrong password.
     **/

  static async post({
    user_id,
    movie_id,
    comment = null,
    rating = null,
    favorite = false,
  }) {
    const result = await db.query(
      `INSERT INTO comments
        (user_id, movie_id, comment, rating, favorite)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, comment, rating, favorite`,
      [
        user_id,
        movie_id,
        comment,
        rating,
        favorite,
      ],
    );
    const commentData = result.rows[0];

    return commentData;
  }

  static async get(commentId) {
    const commentsRes = await db.query(
      `SELECT id,
              comment,
              rating,
              favorite
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
              ucer_id,
              movie_id,
              comment,
              rating,
              favorite
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
              comment,
              rating,
              favorite
       FROM comments
       WHERE user_id = $1
       ORDER BY id`,
      [userId]
    );

    return result.rows;
  }

  // static async update(commentId, data) {
  //   const { setCols, values } = sqlForPartialUpdate(
  //     data,
  //     {
  //       comment: "comment",
  //       rating: "rating",
  //       favorite: "favorite",
  //     });
  //   const idVarIdx = "$" + (values.length + 1);

  //   const querySql = `UPDATE comments
  //                     SET ${setCols}
  //                     WHERE id = ${idVarIdx}
  //                     RETURNING id,
  //                               comment,
  //                               rating,
  //                               favorite`;
  //   const result = await db.query(querySql, [...values, commentId]);
  //   const comment = result.rows[0];

  //   if (!comment) throw new NotFoundError(`No comment: ${commentId}`);

  //   return comment;
  // }

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
}

module.exports = Comments;