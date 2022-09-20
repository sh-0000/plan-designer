import { Box } from "@mui/system";
import { fabric } from "fabric";
import { useEffect, useState, useRef } from "react";

const Canvas = ({ setCanvas, children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    setCanvas(
      new fabric.Canvas(canvasRef.current, {
        renderOnAddRemove: true,
      })
    );
  }, [setCanvas]);

  return (
    <Box
      /* ref={parentNode} */
      sx={{
        mx: "15vw",
        my: "1vh",
        height: "calc(98vh - 48px)",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ border: "1px solid rgb(0, 0, 0, 0.12)" }}
      ></canvas>
      {children}
    </Box>
  );
};

export default Canvas;
