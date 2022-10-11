import { createContext, useContext, useEffect, useReducer } from "react";
import useFirestore from "../firebasefunctions";
import reducer from "../reducers/library_reducer";

const initialState = {
  icons_loading: false,
  icons_error: false,
  icons: [],
  isModalOpen: false,
};

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { getCollection, setCollection, removeDocument, uploadFile } =
    useFirestore();

  const fetchIcons = async () => {
    dispatch({ type: "GET_ICONS_REQUEST_START" });
    try {
      const icons = await getCollection("icons");
      dispatch({ type: "GET_ICONS_REQUEST_SUCCESS", payload: icons });
    } catch (err) {
      dispatch({ type: "GET_ICONS_REQUEST_ERROR" });
    }
  };

  const addIcon = async (data) => {
    const { name, category, selectedFile } = data;
    try {
      const filePath = await uploadFile("icons", selectedFile); //upload file returns the file path on success
      const icon = await setCollection("icons", {
        name,
        category,
        img: filePath,
      });
      dispatch({ type: "ADD_ICON_SUCCESS", payload: icon });
    } catch (err) {
      dispatch({ type: "ADD_ICON_FAIL" });
    }
  };

  const deleteIcon = async (id) => {
    try {
      await removeDocument("icons", id);
      dispatch({ type: "DELETE_ICON_SUCCESS", payload: id });
    } catch (err) {
      dispatch({ type: "DELETE_ICON_ERROR" });
    }
  };

  const toggleModal = (shouldOpen) => {
    if (shouldOpen) {
      dispatch({ type: "OPEN_MODAL" });
    } else {
      dispatch({ type: "CLOSE_MODAL" });
    }
  };


  useEffect(() => {
    fetchIcons();
  }, []);

  return (
    <LibraryContext.Provider value={{ ...state, addIcon, deleteIcon, toggleModal }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = () => {
  return useContext(LibraryContext);
};
