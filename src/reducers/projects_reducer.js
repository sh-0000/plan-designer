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

  if (action.type === "DELETE_PROJECT_START") {
    //SHOW CONFIRM MODAL
    return { ...state };
  }
  if (action.type === "DELETE_PROJECT_SUCCESS") {
    const id = action.payload;
    let { projects } = state;
    projects = projects.filter((project) => project.id !== id);
    return { ...state, projects: projects };
  }
  if (action.type === "DELETE_PROJECT_ERROR") {
    //SHOW ERROR MSG
    return { ...state };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default projects_reducer;
