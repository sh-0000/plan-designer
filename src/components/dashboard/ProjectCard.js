import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { ConfirmDialog } from "../dialog/ConfirmDialog";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project, onDelete }) => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });
  return (
    <>
      <Card
        variant="elevation"
        sx={{
          position: "relative",
          "&:hover": {
            ".del-btn": { opacity: 1 },
            ".edit-btn": { opacity: 1 },
            ".card-img": { opacity: 0.5 },
          },
        }}
      >
        <CardMedia
          className="card-img"
          sx={{
            width: "100%",
            transition: "0.3s ease",
          }}
          component="img"
          src={project.schema}
        />
        <CardContent sx={{ bgcolor: "#efefef" }}>
          <Typography variant="h5">{project.title}</Typography>
          <Typography variant="subtitle2">{project.address}</Typography>
          <IconButton
            className="del-btn"
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              opacity: 0,
              boxShadow: 3,
              transition: "0.3s ease",
              bgcolor: "white",
              "&:hover": {
                bgcolor: "error.main",
                color: "white",
              },
            }}
            onClick={() =>
              setConfirmDialog({
                isOpen: true,
                title:
                  'Are you sure you want to delete "' + project.title + '"',
                onConfirm: () => {
                  onDelete(project.id);
                },
              })
            }
          >
            <Delete />
          </IconButton>
          <IconButton
            className="edit-btn"
            component={Link}
            to={`/editor/${project.id}`}
            sx={{
              position: "absolute",
              opacity: 0,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              bgcolor: "primary.main",
              transition: "0.3s ease",
              boxShadow: 3,
              "&:hover": {
                bgcolor: "#1565c0",
              },
            }}
          >
            <Edit />
          </IconButton>
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectCard;
