import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import ProjectCard from "./ProjectCard";

const ProjectCards = ({ projects, onDelete }) => {
  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      <Grid container spacing={4}>
        {projects.map((project) => {
          return (
            <Grid item key={project.id} xs={12} sm={6} md={4}>
              <ProjectCard project={project} onDelete={onDelete} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
export default ProjectCards;
