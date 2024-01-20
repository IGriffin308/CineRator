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

  static async getTestData() {
    let res = await this.request(`api`);
    return res.data;
  }
}

export default CineratorApi;