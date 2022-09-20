import Searchbar from "../Searchbar";
import React, { useEffect, useState } from "react";
import ProjectCards from "./ProjectCards";
import AddProjectButton from "./AddProject";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { useFilterContext } from "../../context/filter_context";
import { useProjectsContext } from "../../context/projects_context";

const Dashboard = () => {
  /* const { addProject, deleteProject } = useProjectsContext(); */

  const { filtered_projects: projects, updateProjectFilter } =
    useFilterContext();

  const deleteProject = () => {};

  const addProject = (data) => {
    console.log(data);
  };

  /*   const deleteProject = async (id) => {
    console.log("deleting", id);
      await fetch(`http://localhost:3001/projects/${id}`, {
      method: "DELETE",
    }); 
     setProjects(projects.filter((project) => id != project.id));
  };
 */
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
