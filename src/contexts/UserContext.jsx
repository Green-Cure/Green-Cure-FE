"use client";

import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userData, _setUserData] = useState(null);

  const setUserData = (data) => {
    _setUserData(data);
  };

  return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
};
