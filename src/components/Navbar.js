import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  CssBaseline,
  Box,
} from "@mui/material";
import { HomeRounded, Collections } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        position="relative"
        component="nav"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "primary.main",
        }}
      >
        <Toolbar variant="dense">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            component={Link}
            to="/"
          >
            <HomeRounded />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Plan Designer
          </Typography>
          <Button
            color="inherit"
            startIcon={<Collections />}
            component={Link}
            to="/LegendLibrary"
          >
            Library
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
