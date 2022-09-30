import { fabric } from "fabric";
import { useEffect } from "react";
const Rectangle = ({ canvas }) => {
  useEffect(() => {
    const rect = new fabric.Rect({
      height: 250,
      width: 150,
      fill: "red",
    });
    canvas.add(rect);
  }, [canvas]);
};

export default Rectangle
