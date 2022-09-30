const filter_reducer = (state, action) => {
  if (action.type === "LOAD_PROJECTS") {
    return {
      ...state,
      all_projects: [...action.payload],
      filtered_projects: [...action.payload],
    };
  }
  /*  "UPDATE_PROJECT_FILTER" is called every time the searchbar value is modified */
  if (action.type === "UPDATE_PROJECT_FILTER") {
    return { ...state, project_filter: action.payload };
  }
  /* "FILTER_PROJECTS" is called everytime 
    "UPDATE_PROJECT_FILTER" runs using the 
    useEffect hook on filter_context */
  if (action.type === "FILTER_PROJECTS") {
    const { all_projects, project_filter } = state;
    /* project filter is a string value from the search bar */
    let filtered_projects = all_projects.filter(
      (project) =>
        project.title
          .toLowerCase() //Change to lower case
          .includes(project_filter.value.toLowerCase()) ||
        /* use the includes function to check if filter exists within project title */
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
  /*  "UPDATE_ICON_FILTER" is called every time the searchbar or categorylist value is modified */
  if (action.type === "UPDATE_ICON_FILTER") {
    /* type is either "category" or "text", which determines the filter by type */
    const { type, value } = action.payload;

    return { ...state, icon_filters: { ...state.icon_filters, [type]: value } };
  }
  /* "FILTER_ICONS" is called everytime 
    "UPDATE_ICONS_FILTER" runs using the 
    useEffect hook on filter_context */
  if (action.type === "FILTER_ICONS") {
    const { all_icons } = state;
    const { text, category } = state.icon_filters;
    let filtered_icons = [...all_icons];
    /* filter by type: text */
    if (text) {
      filtered_icons = filtered_icons.filter(
        (icon) =>
          icon.name.toLowerCase().includes(text.toLowerCase()) ||
          icon.category.toLowerCase().includes(text.toLowerCase())
      );
    }
    /* filter by type: category */
    if (category !== "All") {
      filtered_icons = filtered_icons.filter(
        (icon) => icon.category === category
      );
    }
    return { ...state, filtered_icons: filtered_icons };
  }
  /* Throw an error if no  action types match to 
     catch errors. all actions should be accounted for */
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
