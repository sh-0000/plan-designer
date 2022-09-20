const filter_reducer = (state, action) => {
  if (action.type === "LOAD_PROJECTS") {
    return {
      ...state,
      all_projects: [...action.payload],
      filtered_projects: [...action.payload],
    };
  }
  if (action.type === "UPDATE_PROJECT_FILTER") {
    return { ...state, project_filter: action.payload };
  }
  if (action.type === "FILTER_PROJECTS") {
    const { all_projects, project_filter } = state;
    let filtered_projects = all_projects.filter(
      (project) =>
        project.title
          .toLowerCase()
          .includes(project_filter.value.toLowerCase()) ||
        project.address
          .toLowerCase()
          .includes(project_filter.value.toLowerCase())
    );
    return { ...state, filtered_projects: filtered_projects };
  }
  if (action.type === "LOAD_ICONS") {
    return {
      ...state,
      all_icons: [...action.payload],
      filtered_icons: [...action.payload],
    };
  }
  if (action.type === "UPDATE_ICON_FILTER") {
    const { type, value } = action.payload;
    return { ...state, icon_filters: { ...state.icon_filters, [type]: value } };
  }
  if (action.type === "FILTER_ICONS") {
    const { all_icons } = state;
    const { text, category } = state.icon_filters;
    let filtered_icons = [...all_icons];
    if (text) {
      filtered_icons = filtered_icons.filter(
        (icon) =>
          icon.name.toLowerCase().includes(text.toLowerCase()) ||
          icon.category.toLowerCase().includes(text.toLowerCase())
      );
    }
    if (category !== "All") {
      filtered_icons = filtered_icons.filter(
        (icon) => icon.category === category
      );
    }
    return { ...state, filtered_icons: filtered_icons };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
