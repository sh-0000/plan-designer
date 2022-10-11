import { createContext, useContext, useEffect, useReducer } from "react";
import useFirestore from "../firebasefunctions";
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

  const {
    getCollection,
    getDocument,
    setCollection,
    removeDocument,
    uploadFile,
  } = useFirestore();

  const fetchProjects = async () => {
    dispatch({ type: "GET_PROJECTS_REQUEST_START" });
    try {
      const projects = await getCollection("projects");
      dispatch({ type: "GET_PROJECTS_REQUEST_SUCCESS", payload: projects });
    } catch (err) {
      dispatch({ type: "GET_PROJECTS_REQUEST_ERROR" });
    }
  };
  const fetchSingleProject = async (id) => {
    dispatch({ type: "GET_SINGLE_PROJECT_REQUEST_START" });
    try {
      const project = await getDocument("projects", id);
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

  const addProject = async (data) => {
    const { address, title, selectedFile } = data;
    try {
      const filePath = await uploadFile("projects", selectedFile);
      const res = await setCollection("projects", {
        address,
        title,
        schema: filePath,
      });
      dispatch({ type: "ADD_PROJECT_SUCCESS", payload: res });
    } catch (err) {
      console.log("failed to add");
    }
  };

  const deleteProject = async (id) => {
    try {
      await removeDocument("projects", id);
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
      value={{
        ...state,
        fetchSingleProject,
        addProject,
        deleteProject,
        toggleModal,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
export const useProjectsContext = () => {
  return useContext(ProjectsContext);
};
