import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/projects_reducer";

const initialState = {
  projects_loading: false,
  projects_error: false,
  projects: [],
  single_project_loading: false,
  single_project_error: false,
  single_project: {},
  isModalOpen: false,
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
  const fetchSingleProject = async (id) => {
    dispatch({ type: "GET_SINGLE_PROJECT_REQUEST_START" });
    try {
      const response = await fetch(`http://localhost:3001/projects/${id}`);
      const project = await response.json();
      dispatch({
        type: "GET_SINGLE_PROJECT_REQUEST_SUCCESS",
        payload: project,
      });
    } catch (err) {
      dispatch({ type: "GET_SINGLE_PROJECT_REQUEST_ERROR" });
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

  const toggleModal = (shouldOpen) => {
    if (shouldOpen) {
      dispatch({ type: "OPEN_MODAL" });
    } else {
      dispatch({ type: "CLOSE_MODAL" });
    }
  };

  return (
    <ProjectsContext.Provider
      value={{ ...state, fetchSingleProject, deleteProject, toggleModal }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
export const useProjectsContext = () => {
  return useContext(ProjectsContext);
};
