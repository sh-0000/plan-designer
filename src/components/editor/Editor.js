import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LeftPanel, RightPanel } from "./SidePanel";
import Canvas from "./Canvas";
import { Typography } from "@mui/material";
import MenuBar from "./MenuBar";
import { fabric } from "fabric";

const Editor = () => {
  const { projectID } = useParams();
  const [project, setProject] = useState();
  const [categories, setCategories] = useState();
  const [icons, setIcons] = useState();
  const [canvas, setCanvas] = useState();

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

  const isLoadingComplete = () => {
    return project && categories && icons;
  };

  const fetchData = async (req) => {
    const res = await fetch(req);
    const data = await res.json();
    return data;
  };

  return (
    <>
      {isLoadingComplete() ? (
        <>
          <RightPanel />
          <LeftPanel icons={icons} categories={categories} />
          <Canvas setCanvas={setCanvas} />
        </>
      ) : (
        <Typography align="center" variant="h6">
          Loading...
        </Typography>
      )}
    </>
  );
};

export default Editor;
