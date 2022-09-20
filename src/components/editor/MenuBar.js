import { ExitToApp } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const MenuBar = ({ project }) => {
  return (
    <>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: "#004ba0",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        position="relative"
      >
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            component={Link}
            to="/"
            sx={{ color: "white" }}
          >
            <ExitToApp />
          </IconButton>
          <Typography sx={{ ml: 5 }} variant="h6">
            {project.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MenuBar;
