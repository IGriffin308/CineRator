import axios from "axios";

const BASE_URL = "http://localhost:5000"

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be anything frontend-specific here, and there shouldn't
 * be anything API-aware elsewhere in the frontend.
 *
 */

class CineratorApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${CineratorApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** User Section */

  /** Get the current user. */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Login user. */
  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  /** Signup for site. */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  /** Save user profile page. */
  static async saveProfile(username, data) {
    let res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

/** ---------------------- */
  /** Movies section */

  /** Get movie by ID.
   * Use session storage to store and retrieve movie data.
   * If movie is not in session storage, get it from the API.
   * This will prevent unnecessary 3rd party API calls.
   */
  static async getMovieById(id) {
    if (sessionStorage.getItem(id)) {
      console.log("movie loaded by ID from session storage");
      return JSON.parse(sessionStorage.getItem(id));
    } else {
      let res = await this.request(`omdb/id/${id}`);
      sessionStorage.setItem(id, JSON.stringify(res.omdbRes));
      console.log("movie loaded by ID from api");
      return res.omdbRes;
    }
  }

  // static async getMovieByTitle(title) {
  //   if (sessionStorage.getItem(title)) {
  //     console.log("movie loaded by title from session storage");
  //     return JSON.parse(sessionStorage.getItem(title));
  //   } else {
  //     let res = await this.request(`omdb/title/${title}`);
  //     sessionStorage.setItem(title, JSON.stringify(res.omdbRes));
  //     console.log("movie loaded by title from from api");
  //     return res.omdbRes;
  //   }
  // }

  /** Get list of movies by search term.
   * Use session storage to store and retrieve list of results.
   * If result is not in session storage, get it from the API.
   * This will prevent unnecessary 3rd party API calls.
   */
  static async getMovieBySearch(title) {
    if (sessionStorage.getItem(title)) {
      console.log("movie loaded by search from session storage");
      return JSON.parse(sessionStorage.getItem(title));
    } else {
      let res = await this.request(`omdb/search/${title}`);
      sessionStorage.setItem(title, JSON.stringify(res.omdbRes));
      console.log("movie loaded by search from from api");
      return res.omdbRes;
    }
  }

  // static async getLoremIpsum() {
  //   let res = await this.request(`omdb/lorem`);
  //   console.log(res);
  //   return res.omdbRes;
  // }


  /** ---------------------- */
  /** Comments section */

  /** Get comments by movie id. */
  static async getCommentsByMovie(id) {
    let res = await this.request(`comments/movie/${id}`);
    console.log("res.comments", res);
    return res.comments;
  }

  /** Add a comment. */
  static async addComment(data) {
    let res = await this.request(`comments`, data, "post");
    console.log("sending:", res);
    return res.data;
  }

  /** Edit a comment. */
  static async editComment(id, data) {
    let res = await this.request(`comments/${id}`, data, "patch");
    console.log("sending:", res);
    return res.data;
  }

  /** Delete a comment. */
  static async deleteComment(id) {
    let res = await this.request(`comments/${id}`, {}, "delete");
    return res;
  }

  /** Check if comment exists. */
  static async checkIfCommentExists(userId, movieId) {
    let res = await this.request(`comments/${userId}/${movieId}`);
    try {
      if (res.exists === false) {
        return false;
      }
      return res;
    } catch (err) {
      console.log("error:", err);
    }
  }


  /** ---------------------- */
  /** Favorites section
   * Favorites and Ratings are stored in the same table.
   * Each user can only have one favorite and rating value per movie.
   */

  /** Get all favorites and ratings for a user. */
  static async getFavoritesByUser(userId) {
    let res = await this.request(`favorites/user/${userId}`);
    return res.favorites;
  }

  /** Get all favorites and ratings for a movie. */
  static async getFavoritesByMovie(movieId) {
    console.log("get fav by movie movieId", movieId.movieId);
    let res = await this.request(`favorites/movie/${movieId.movieId}`);
    return res.favorites;
  }

  static async getFavorite(userId, movieId) {
    let res = await this.request(`favorites/user-movie/${userId}/${movieId}`);
    console.log("res.favorite", res.favorite);
    return res.favorite;
  }

  /** Add a new favorite and rating entry for a specific user on a specific movie. 
   * This should only occur if the user has not already have an entry for the movie.
  */
  static async addFavorite(data) {
    let res = await this.request(`favorites`, data, "post");
    console.log("sending to favorite:", data);
    return res.favorite;
  }

  /** Edit an existing favorite and rating entry for a specific user on a specific movie
   * This should only occur if the user already has an entry for the movie.
   */
  static async editFavorite(userId, movieId, data) {
    let res = await this.request(`favorites/user-movie/${userId}/${movieId}`, data, "patch");
    return res.favorite;
  }

  /** Delete a favorite. */
  static async deleteFavorite(userId, movieId) {
    let res = await this.request(`favorites/user-movie/${userId}/${movieId}`, {}, "delete");
    return res;
  }

  /** Check if favorite exists.
   * This may be useful in determine if a user already has an entry a movie.
   */
  static async checkIfFavoriteExists(userId, movieId) {
    let res = await this.request(`favorites/check/${userId}/${movieId}`);
    try {
      if (res.exists === false) {
        return false;
      }
      return res;
    } catch (err) {
      console.log("error:", err);
    }
  }
}

export default CineratorApi;