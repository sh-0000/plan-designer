import { Box } from "@mui/system";
import { fabric } from "fabric";
import { useEffect, useRef } from "react";

const Canvas = ({ bgImg }) => {
  var canvas = undefined;

  const parentNode = useRef();

  useEffect(() => {
    const initialCanvas = new fabric.Canvas("canvas", {
      height: parentNode.current.clientHeight,
      width: parentNode.current.clientWidth,
    });
    fabric.Image.fromURL(bgImg, (img) => {
      initialCanvas.setBackgroundImage(
        img,
        initialCanvas.renderAll.bind(initialCanvas),
        {
          scaleX: initialCanvas.width / img.width,
          scaleY: initialCanvas.height / img.height,
        }
      );
    });
    canvas = initialCanvas;
  }, []);

  useEffect(() => {
    canvas.on("drop", (event) => handleDrop(event.e));
    canvas.on("dragover", (event) => handleDragOver(event.e));
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("id");
    const imgElem = document.getElementById(data);
    const img = new fabric.Image(imgElem, {
      left: e.layerX - 30,
      top: e.layerY - 30,
    });
    img.scaleToHeight(imgElem.height);
    img.scaleToWidth(imgElem.width);
    canvas.add(img);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  return (
    <>
      <Box
        ref={parentNode}
        sx={{
          mx: "15vw",
          my: "1vh",
          height: "calc(98vh - 48px)",
        }}
      >
        <canvas
          style={{ border: "1px solid rgb(0, 0, 0, 0.12)" }}
          id="canvas"
        ></canvas>
      </Box>
    </>
  );
};

export default Canvas;
