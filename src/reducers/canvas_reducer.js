import { fabric } from "fabric";
const canvas_reducer = (state, action) => {
  /* Initialise the canvas state */
  if (action.type === "INIT_CANVAS") {
    let canvasRef = action.payload;
    const canvas = new fabric.Canvas(canvasRef.current, {
      renderOnAddRemove: true,
      width: canvasRef.current.parentNode.clientWidth,
      height: canvasRef.current.parentNode.clientHeight,
    });
    return { ...state, canvas_loaded: true, canvas: canvas };
  }

  /* Push image data to the array */
  if (action.type === "PUSH_IMG_DATA") { 
    const { imgElem, e } = action.payload;
    let options = { left: e.layerX, top: e.layerY }; //Options = mouseX and mouseY of the event
    return {
      ...state,
      images: [...state.images, { element: imgElem, options: options }],
    };
  }
};
export default canvas_reducer;
