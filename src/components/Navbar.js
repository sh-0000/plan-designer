import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  CssBaseline,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Link } from "react-router-dom";

const Navbar = () => {
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
            <HomeRoundedIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Plan Designer
          </Typography>
          <Button
            startIcon={<CollectionsIcon />}
            component={Link}
            to="/LegendLibrary"
            sx={{ color: "white" }}
          >
            Legend Library
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
