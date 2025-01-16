import React, { createContext, useContext, useState } from 'react';

// Create a context for the user
const UserContext = createContext();

// Create a custom hook to use the context
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("authToken") || null);
  const [databaseId, setDatabaseId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId, databaseId, setDatabaseId }}>
      {children}
    </UserContext.Provider>
  );
};

