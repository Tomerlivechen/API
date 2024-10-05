import { useContext } from "react";
import { SearchContext } from "../ContextAPI/SearchContext";

const useSearch = () => {
  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error("search must be within searchProvider");
  }
  return searchContext;
};

export { useSearch };
