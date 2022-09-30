import { Box } from "@mui/material";
import { useEffect, useRef } from "react";
import { useCanvasContext } from "../../context/canvas_context";

const Canvas = ({ children }) => {
  const { initCanvas } = useCanvasContext();
  const canvasRef = useRef();
  useEffect(() => {
    initCanvas(canvasRef);
  }, []);
  return (
    <Box sx={{ mx: "14%", height: "calc(100vh - 48px) !important" }}>
      <canvas ref={canvasRef}></canvas>
      {children}
    </Box>
  );
};

export default Canvas;
