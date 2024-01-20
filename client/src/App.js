

import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import CineratorApi from "./api/api";
import { useJwt as jwt} from "react-jwt";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "cinerator-token";

/** Cinerator application. */

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  // const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [backendData, setBackendData] = useState([{}]);

  console.debug(
      "App",
      "infoLoaded=", infoLoaded,
      "currentUser=", currentUser,
      // "token=", token,
  );


  let data
  async function getData() {
    try {
      data = await CineratorApi.getTestData();
      // setToken(token);
      // return { success: true };
      return data;
    } catch (errors) {
      console.error("get failed", errors);
      return { success: false, errors };
    }
  }

  useEffect(() => {
    getData().then(data => {
      console.log(data)
      setBackendData(data)
    })
  }, []);

  console.log(backendData);

  return (
    <BrowserRouter>
      <h1>React App</h1>
      {/* {(typeof backendData.data === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.data.map((value, key) => (
          <div key={key}>
            <h2>{value.title}</h2>
          </div>
        ))
      )} */}
      <h2>{backendData.data}</h2>
    </BrowserRouter>
  );
}

export default App;