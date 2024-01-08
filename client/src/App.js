import React, {useEffect, useState} from 'react';

function App() {

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setBackendData(data));
  }, []);

  return (
    <div>
      <h1>React App</h1>
      {(typeof backendData.data === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.data.map((value, key) => (
          <div key={key}>
            <h2>{value.title}</h2>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
