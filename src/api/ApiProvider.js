import React, { useState, useEffect } from 'react';
import ApiContext from './ApiContext';

const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);

//   useEffect(() => {
//     // Make API requests and set the data in state
//     // Example:
//     fetch('https://api.example.com/data')
//       .then(response => response.json())
//       .then(data => setApiData(data));
//   }, []);

  return (
    <ApiContext.Provider value={apiData}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
