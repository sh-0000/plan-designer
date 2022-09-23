import { Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";

const ProjectCards = ({ projects, onDelete }) => {
  return (
    <Grid container spacing={4}>
      {projects.map((project) => {
        return (
          <Grid item key={project.id} xs={12} sm={6} md={4}>
            <ProjectCard project={project} onDelete={onDelete} />
          </Grid>
        );
      })}
    </Grid>
  );
};
export default ProjectCards;
