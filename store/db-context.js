import { createContext } from "react";
import { initDb } from "../utils/Database";
import { PlaceDao } from "../dao/PlaceDao";

export const DbContext = createContext({
  placeDao: null,
});

const DbContextProvider = ({ children }) => {
  const db = initDb();

  const value = {
    placeDao: new PlaceDao(db),
  };

  return <DbContext.Provider value={value}>{children}</DbContext.Provider>;
};

export default DbContextProvider;
