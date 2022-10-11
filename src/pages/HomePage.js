import { Container, Divider } from "@mui/material";
import { useFilterContext } from "../context/filter_context";
import { useProjectsContext } from "../context/projects_context";
import {
  Searchbar,
  ProjectCards,
  AddProjectForm,
  Loading,
} from "../components";

const HomePage = () => {
  const { filtered_projects: projects, updateProjectFilter } =
    useFilterContext();
  const {
    projects_loading: loading,
    projects_error: error,
    deleteProject,
  } = useProjectsContext();

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <h2>There was an error while retrieving data</h2>;
  }
  return (
    <Container sx={{ py: 4 }} maxWidth="xl">
      <Searchbar onFilter={updateProjectFilter} />
      <Divider sx={{ my: 4 }} />
      <ProjectCards projects={projects} onDelete={deleteProject} />
      <AddProjectForm />
    </Container>
  );
};
export default HomePage;
