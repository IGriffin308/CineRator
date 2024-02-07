

import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";
import NavRoutes from './componentsMain/NavRoutes'
import NavBar from "./componentsMain/NavBar";
import FullPage from "./componentsMain/FullPage";
import LoadingSpinner from "./common/LoadingSpinner";
import CineratorApi from "./api/api";
import UserContext from "./auth/UserContext";
import { useJwt as jwt} from "react-jwt";
import { jwtDecode } from "jwt-decode";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "cinerator-token";

/** Cinerator application.
*
* - infoLoaded: has user data been pulled from API?
*   (this manages spinner for "loading...")
*
* - currentUser: user obj from API. This becomes the canonical way to tell
*   if someone is logged in. This is passed around via context throughout app.
*
* - token: for logged in users, this is their authentication JWT.
*   Is required to be set for most API calls. This is initially read from
*   localStorage and synced to there via the useLocalStorage hook.
*
* App -> Routes
*/


function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  // const [backendData, setBackendData] = useState([{}]);

  console.debug(
      "App",
      "infoLoaded=", infoLoaded,
      "currentUser=", currentUser,
      "token=", token,
  );

  // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          // put the token on the Api class so it can use it to call the API.
          CineratorApi.token = token;
          let currentUser = await CineratorApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // set infoLoaded to false while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles site-wide logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide signup.
   *
   * Automatically logs them in (set token) upon signup.
   *
   * Make sure you await this function and check its return value!
   */
  async function signup(signupData) {
    try {
      let token = await CineratorApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("signup failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await CineratorApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  // let data
  // async function getData() {
  //   try {
  //     data = await CineratorApi.getTestData();
  //     return data;
  //   } catch (errors) {
  //     console.error("get failed", errors);
  //     return { success: false, errors };
  //   }
  // }

  // useEffect(() => {
  //   getData().then(data => {
  //     console.log(data)
  //     setBackendData(data)
  //   })
  // }, []);

  // console.log(backendData);

  return (
    <BrowserRouter>
      <UserContext.Provider
            value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <NavBar logout={ logout }/>
          <FullPage />
          <NavRoutes login={login} signup={signup}/>
      {/* {(typeof backendData.data === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.data.map((value, key) => (
          <div key={key}>
            <h2>{value.title}</h2>
          </div>
        ))
      )} */}
      {/* <h2>{backendData.data}</h2> */}
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;