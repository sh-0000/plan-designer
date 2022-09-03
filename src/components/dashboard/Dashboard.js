import Navbar from "../Navbar";
import Searchbar from "./Searchbar";
import React, { useEffect, useState } from "react";
import ProjectCards from "./ProjectCards";
import { AddProject } from "./AddProject";
import ProjectCard from "./ProjectCard";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  const [query, setQuery] = useState("");

  useEffect(() => {
    const getProjects = async () => {
      const resData = await fetchProjects();
      setProjects(resData);
    };
    getProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await fetch("http://localhost:3001/projects");
    const data = await res.json();
    return data;
  };

  const filteredResults = !query
    ? projects
    : projects.filter(
        (project) =>
          project.title.toLowerCase().includes(query.toLowerCase()) ||
          project.address.toLowerCase().includes(query.toLowerCase())
      );

  const deleteProject = async (id) => {
    console.log("deleting", id);
/*     await fetch(`http://localhost:3001/projects/${id}`, {
      method: "DELETE",
    }); */
    setProjects(projects.filter((project) => id != project.id));
  };

  const editProject = (id) => {
    console.log("editing", id);
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <h1> Projects </h1>
        <AddProject />
        <Searchbar setQuery={setQuery} />
        <ProjectCards
          projects={filteredResults}
          onDelete={deleteProject}
          onEdit={editProject}
        />
      </div>
    </>
  );
};

export default Dashboard;
