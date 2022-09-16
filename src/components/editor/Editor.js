import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { LeftPanel, RightPanel } from "./SidePanel";
import Canvas from "./Canvas";
import { Box } from "@mui/material";
import MenuBar from "./MenuBar";

const Editor = () => {
  const { projectID } = useParams();
  const [project, setProject] = useState("");
  const [categories, setCategories] = useState("");
  const [icons, setIcons] = useState("");

  const boxRef = useRef();

  useEffect(() => {
    const getProject = async () => {
      const resData = await fetchData(
        `http://localhost:3001/projects/${projectID}`
      );
      setProject(resData);
    };
    getProject();
    const getCategories = async () => {
      const resData = await fetchData("http://localhost:3001/categories");
      setCategories(resData);
    };
    getCategories();
    const getIcons = async () => {
      const resData = await fetchData("http://localhost:3001/icons");
      setIcons(resData);
    };
    getIcons();
  }, []);

  const fetchData = async (req) => {
    const res = await fetch(req);
    const data = await res.json();
    return data;
  };

  return (
    <>
      <MenuBar project={project} />
      <LeftPanel icons={icons} categories={categories} />
      <RightPanel />
      <Box
        sx={{
          mx: "16%",
          my: "1%",
        }}
      >
        <Canvas url={project.schema} />
      </Box>
    </>
  );
};

export default Editor;
