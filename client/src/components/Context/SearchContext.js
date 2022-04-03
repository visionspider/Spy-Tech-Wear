import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <SearchContext.Provider
      value={{
        setSearchResults,
        searchResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
