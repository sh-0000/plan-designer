import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar";

const Editor = () => {
  const { projectID } = useParams();
  const [project, setProject] = useState("");

  useEffect(() => {
    const getProject = async () => {
      const resData = await fetchProject();
      setProject(resData);
    };
    getProject();
  }, []);

  console.log(project);

  const fetchProject = async () => {
    const res = await fetch(`http://localhost:3001/projects/${projectID}`);
    const data = await res.json();
    return data;
  };

  return (
    <>
      <Navbar />
      <h2>Edit Page</h2>
      <h4>Editing {project.title} </h4>
      <img src={project.schema} />
    </>
  );
};

export default Editor;
