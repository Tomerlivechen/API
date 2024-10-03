import { useContext } from "react";
import { SearchContext } from "../ContextAPI/SearchContext";

const useSearch = () => {
  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error("userAuth must be within AuthProvider");
  }
  return searchContext;
};

export { useSearch };
