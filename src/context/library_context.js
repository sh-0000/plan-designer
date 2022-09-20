import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/library_reducer";

const initialState = {
  icons_loading: false,
  icons_error: false,
  icons: [],
};

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchIcons = async () => {
    dispatch({ type: "GET_ICONS_REQUEST_START" });
    try {
      const response = await fetch("http://localhost:3001/icons");
      const icons = await response.json();
      dispatch({ type: "GET_ICONS_REQUEST_SUCCESS", payload: icons });
    } catch (err) {
      dispatch({ type: "GET_ICONS_REQUEST_ERROR" });
    }
  };

  useEffect(() => {
    fetchIcons();
  }, []);

  return (
    <LibraryContext.Provider value={{ ...state }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = () => {
  return useContext(LibraryContext);
};
