import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { Box } from "@mui/system";
import { ConfirmDialog } from "../dialog/ConfirmDialog";
import { useState } from "react";

const ProjectCard = ({ project, onDelete, onEdit }) => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
  });
  return (
    <>
      <Card variant="outlined">
        <Box
          sx={{
            position: "relative",
            "&:hover": {
              ".del-btn": { opacity: 1 },
              ".edit-btn": { opacity: 1 },
              ".card-img": { opacity: 0.5 },
            },
          }}
        >
          <CardHeader
            title={project.title}
            action={
              <IconButton
                className="del-btn"
                sx={{
                  opacity: 0,
                  boxShadow: 3,
                  transition: "0.3s ease",
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
            }
          />
          <CardMedia
            className="card-img"
            sx={{
              transition: "0.3s ease",
            }}
            component="img"
            height="350px"
            image={project.schema}
          />
          <IconButton
            className="edit-btn"
            onClick={() => onEdit(project.id)}
            sx={{
              opacity: 0,
              top: "50%",
              left: "50%",
              position: "absolute",
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
          <CardContent>{project.address}</CardContent>
        </Box>
      </Card>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default ProjectCard;
