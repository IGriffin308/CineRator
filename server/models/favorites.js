"use strict";

const db = require("../db.js");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql.js");
const {
    NotFoundError,
    BadRequestError
} = require("../expressError.js");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class Favorites {

    static async post({
      user_id, 
      movie_id, 
      rating = null, 
      favorite = false
    }) {
        const duplicateCheck = await db.query(
            `SELECT user_id, movie_id
            FROM favorites
            WHERE user_id = $1 AND movie_id = $2`,
            [user_id, movie_id],
        );
        console.log("duplicateCheck", duplicateCheck);
        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`User: ${user_id} already has an entry for movie: ${movie_id}`);
        }

        const result = await db.query(
        `INSERT INTO favorites
            (user_id, movie_id, rating, favorite)
            VALUES ($1, $2, $3, $4)
            RETURNING user_id, movie_id, rating, favorite`,
        [
            user_id,
            movie_id,
            rating,
            favorite
        ],
        );
        const favoriteData = result.rows[0];
    
        return favoriteData;
    }
    
    static async get(user_id, movie_id) {
        const favoritesRes = await db.query(
        `SELECT *
             FROM favorites
             WHERE user_id = $1 AND movie_id = $2`,
            [user_id, movie_id],
        );
        
        const favorites = favoritesRes.rows;
        
        if (!favorites) throw new NotFoundError(`No Entry for user: ${user_id}`);
        return favorites;
    }

    static async getAllForUser(user_id) {
        const favoritesRes = await db.query(
        `SELECT *
             FROM favorites
             WHERE user_id = $1`,
            [user_id],
        );
        
        const favorites = favoritesRes.rows;
        
        if (!favorites) throw new NotFoundError(`No Entry for user: ${user_id}`);
        return favorites;
    }

    static async getAllForMovie(movie_id) {
        const favoritesRes = await db.query(
        `SELECT *
             FROM favorites
             WHERE movie_id = $1`,
            [movie_id],
        );
        
        const favorites = favoritesRes.rows;
        
        if (!favorites) throw new NotFoundError(`No Entry for movie: ${movie_id}`);
        return favorites;
    }

    static async update(
        user_id, 
        movie_id, 
        rating, 
        favorite
    ) {
        const result = await db.query(
        `UPDATE favorites
            SET rating = $3, favorite = $4
            WHERE user_id = $1 AND movie_id = $2
            RETURNING user_id, movie_id, rating, favorite`,
        [user_id, movie_id, rating, favorite],
        );
        const favoriteData = result.rows[0];
    
        if (!favoriteData) throw new NotFoundError(`No favorite for user: ${user_id} and movie: ${movie_id}`);
    
        return favoriteData;
    }
    
    static async delete(user_id, movie_id) {
        const result = await db.query(
        `DELETE
            FROM favorites
            WHERE user_id = $1 AND movie_id = $2
            RETURNING user_id, movie_id`,
        [user_id, movie_id],
        );
        const favorite = result.rows[0];
    
        if (!favorite) throw new NotFoundError(`No favorite for user: ${user_id} and movie: ${movie_id}`);
    }

    static async checkIfFavoriteExists(user_id, movie_id) {
        const result = await db.query(
        `SELECT user_id, movie_id
            FROM favorites
            WHERE user_id = $1 AND movie_id = $2`,
        [user_id, movie_id],
        );
        const favorite = result.rows[0];
    
        if (!favorite) {
            return false;
        }
        return favorite;
    }
}

module.exports = Favorites;