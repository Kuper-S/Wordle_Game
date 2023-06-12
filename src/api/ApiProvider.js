import React, { useState, useEffect } from 'react';
import ApiContext from './ApiContext';

const ApiProvider = ({ children }) => {
  const [apiData, setApiData] = useState([]);



  return (
    <ApiContext.Provider value={apiData}>
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
