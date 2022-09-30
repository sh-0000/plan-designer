import { fabric } from "fabric";
import { useEffect } from "react";
const Background = ({ canvas, src, onUpdate }) => {
  useEffect(() => {
    fabric.Image.fromURL(src, (img) => {
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height,
      });
    });
  }, [canvas, src]);
};
export default Background;
