import {
  IconButton,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Grid,
} from "@mui/material";
import { Delete, Edit, Translate } from "@mui/icons-material";
import { Container } from "@mui/system";
import { ConfirmDialog } from "../dialog/ConfirmDialog";
import { useState } from "react";
import ProjectCard from "./ProjectCard";

const ProjectCards = ({ projects, onDelete, onEdit }) => {
  return (
    <Container maxWidth="xl">
      <Grid container columnSpacing={3}>
        {projects.map((project) => {
          return (
            <Grid key={project.id} item md={4}>
              <ProjectCard
                project={project}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
export default ProjectCards;
