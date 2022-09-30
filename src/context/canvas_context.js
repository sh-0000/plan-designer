import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/canvas_reducer";

const initialState = {
  canvas: undefined,
  canvas_loaded: false,
  images: [],
};

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initCanvas = (canvasRef) => {
    dispatch({ type: "INIT_CANVAS", payload: canvasRef });
  };

  /*  */
  useEffect(() => {
    if (!state.canvas_loaded) return; //guard clause to check if canvas is loaded
    state.canvas.on("drop", (event) => handleDrop(event.e));
    state.canvas.on("dragover", (event) => handleDragOver(event.e));
  }, [state.canvas]);

  const handleDrop = (e) => {
    e.preventDefault();
    /* Data transfer to get the id attribute of the dragged img element */
    const data = e.dataTransfer.getData("id");
    const imgElem = document.getElementById(data);
    dispatch({ type: "PUSH_IMG_DATA", payload: { imgElem, e } });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <CanvasContext.Provider value={{ ...state, initCanvas }}>
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvasContext = () => {
  return useContext(CanvasContext);
};
