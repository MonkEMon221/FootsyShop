import { useState, createContext } from "react";
import PropTypes from "prop-types";

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [value, setValue] = useState({
    keyword: "",
    result: [],
  });

  return (
    <SearchContext.Provider value={[value, setValue]}>
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node,
};

export { SearchContext, SearchProvider };
