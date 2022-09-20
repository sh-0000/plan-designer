import React from "react";
import Searchbar from "../Searchbar";
import ProjectCards from "./ProjectCards";
import AddProjectButton from "./AddProject";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { useFilterContext } from "../../context/filter_context";
import { useProjectsContext } from "../../context/projects_context";

const Dashboard = () => {
  const { filtered_projects: projects, updateProjectFilter } =
    useFilterContext();

  const { deleteProject } = useProjectsContext();

  const addProject = (data) => {
    console.log(data);
  };

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          py: 4,
          borderBottom: 1,
        }}
      >
        <AddProjectButton onAdd={addProject} />
        <Typography variant="h4">Search Projects</Typography>
        <Searchbar onFilter={updateProjectFilter} />
      </Container>
      <ProjectCards projects={projects} onDelete={deleteProject} />
    </>
  );
};

export default Dashboard;
