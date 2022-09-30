import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import { useLibraryContext } from "./library_context";
import { useProjectsContext } from "./projects_context";

const initialState = {
  all_projects: [],
  filtered_projects: [],
  all_icons: [],
  filtered_icons: [],
  icon_filters: {
    text: "",
    category: "All",
  },
  project_filter: "",
};

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { projects } = useProjectsContext();
  const { icons } = useLibraryContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  /* Load projects from projects context on load */
  useEffect(() => {
    dispatch({ type: "LOAD_PROJECTS", payload: projects });
  }, [projects]);

  useEffect(() => {
    dispatch({ type: "FILTER_PROJECTS" });
  }, [state.project_filter]);

  const updateProjectFilter = (query) => {
    const { value } = query;
    dispatch({ type: "UPDATE_PROJECT_FILTER", payload: { value } });
  };

  useEffect(() => {
    dispatch({ type: "LOAD_ICONS", payload: icons });
  }, [icons]);

  useEffect(() => {
    dispatch({ type: "FILTER_ICONS" });
  }, [state.icon_filters]);

  const updateIconFilter = (query) => {
    const { type, value } = query;
    dispatch({ type: "UPDATE_ICON_FILTER", payload: { type, value } });
  };

  return (
    <FilterContext.Provider
      value={{ ...state, updateProjectFilter, updateIconFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
