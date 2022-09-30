import { fabric } from "fabric";
import { useEffect, useState } from "react";
const IconImage = ({ canvas, id, element, options, onChange }) => {
  console.log(options);
  const [icon] = useState(
    () =>
      new fabric.Image(element, {
        top: options.top - element.height / 2,
        left: options.left - element.width / 2,
      })
  );

  useEffect(() => {
    icon.scaleToWidth(element.width);
    icon.scaleToHeight(element.height);
    canvas.add(icon);
  }, [canvas, icon]);
  
};

export default IconImage;
