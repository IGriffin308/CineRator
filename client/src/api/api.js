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

  /** Get all movies. */
  static async getMovieById(id) {
    let res = await this.request(`omdb/id/${id}`);
    return res.omdbRes;
  }

  static async getMovieByTitle(title) {
    if (sessionStorage.getItem(title)) {
      console.log("from session storage");
      return JSON.parse(sessionStorage.getItem(title));
    } else {
      let res = await this.request(`omdb/title/${title}`);
      sessionStorage.setItem(title, JSON.stringify(res.omdbRes));
      console.log("from api");
      return res.omdbRes;
    }
  }

  static async getLoremIpsum() {
    let res = await this.request(`omdb/lorem`);
    console.log(res);
    return res.omdbRes;
  }


  /** ---------------------- */
  /** Comments section */

  /** Get comments by title. */
  static async getCommentsByTitle(title) {
    let res = await this.request(`comments/${title}`);
    return res.comments;
  }

  /** Add a comment. */
  static async addComment(data) {
    let res = await this.request(`comments`, data, "post");
    console.log("sending:", res);
    return res.comment;
  }

  /** Edit a comment. */
  static async editComment(id, data) {
    let res = await this.request(`comments/${id}`, data, "patch");
    return res.comment;
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
}

export default CineratorApi;