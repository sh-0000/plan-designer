import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/projects_reducer";

const initialState = {
  projects_loading: false,
  projects_error: false,
  projects: [],
};

const ProjectsContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProjects = async () => {
    dispatch({ type: "GET_PROJECTS_REQUEST_START" });
    try {
      const response = await fetch("http://localhost:3001/projects");
      const projects = await response.json();
      dispatch({ type: "GET_PROJECTS_REQUEST_SUCCESS", payload: projects });
    } catch (err) {
      dispatch({ type: "GET_PROJECTS_REQUEST_ERROR" });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const deleteProject = async (id) => {
    dispatch({ type: "DELETE_PROJECT_START" });
    try {
/*       await fetch(`http://localhost:3001/projects/${id}`, {
        method: "DELETE",
      }); */
      dispatch({ type: "DELETE_PROJECT_SUCCESS", payload: id });
    } catch (err) {
      dispatch({ type: "DELETE_PROJECT_ERROR" });
    }
  };

  return (
    <ProjectsContext.Provider value={{ ...state, deleteProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};
export const useProjectsContext = () => {
  return useContext(ProjectsContext);
};
