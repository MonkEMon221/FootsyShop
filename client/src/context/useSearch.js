import { useContext } from "react";
import { SearchContext } from "./Search";

const useSearch = () => useContext(SearchContext);

export default useSearch;
