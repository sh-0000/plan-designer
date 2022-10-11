const projects_reducer = (state, action) => {
  if (action.type === "GET_PROJECTS_REQUEST_START") {
    return { ...state, projects_loading: true };
  }
  if (action.type === "GET_PROJECTS_REQUEST_SUCCESS") {
    return { ...state, projects: action.payload, projects_loading: false };
  }
  if (action.type === "GET_PROJECTS_REQUEST_ERROR") {
    return { ...state, projects_loading: false, projects_error: true };
  }

  if (action.type === "GET_SINGLE_PROJECT_REQUEST_START") {
    return { ...state, single_project_loading: true };
  }
  if (action.type === "GET_SINGLE_PROJECT_REQUEST_SUCCESS") {
    return {
      ...state,
      single_project: action.payload,
      single_project_loading: false,
    };
  }
  if (action.type === "GET_SINGLE_PROJECT_REQUEST_ERROR") {
    return {
      ...state,
      single_project_loading: false,
      single_project_error: true,
    };
  }

  if (action.type === "ADD_PROJECT_SUCCESS") {
    const project = action.payload;
    const { projects } = state;
    return {
      ...state,
      isModalOpen: false, //close the modal
      projects: [...projects, { ...project }], //push the new project data to the state
    };
  }

  if (action.type === "ADD_PROJECT_FAILED") {
    console.log("failed to add project");
    return { ...state };
  }

  if (action.type === "DELETE_PROJECT_SUCCESS") {
    const id = action.payload;
    let { projects } = state;
    projects = projects.filter((project) => project.id !== id);
    return { ...state, projects: projects };
  }
  if (action.type === "DELETE_PROJECT_ERROR") {
    console.log("Failed to delete project");
    return { ...state };
  }
  if (action.type === "OPEN_MODAL") {
    return { ...state, isModalOpen: true };
  }
  if (action.type === "CLOSE_MODAL") {
    return { ...state, isModalOpen: false };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default projects_reducer;
