// A component created to transfer context between components
// (maybe it will be useful someday)

import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [resJson, setResJson] = useState(null);

  useEffect(() => {
    // check if value store in resJson exists
    const storedResJson = localStorage.getItem('resJson');
    
    if (storedResJson) {
      // if exists set value of resJson
      setResJson(storedResJson);
    }
  }, [])

  const updateResJson = (newResJson) => {
    // store new value of resJson in localstorage
    localStorage.setItem('resJson', newResJson);
    setResJson(newResJson);
  };

  return (
    <DataContext.Provider value={{ resJson, setResJson }}>
      {children}
    </DataContext.Provider>
  );
};