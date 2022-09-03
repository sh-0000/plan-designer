import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CollectionsIcon from "@mui/icons-material/Collections";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar sx={{ backgroundColor: "#004ba0" }} position="sticky">
      <Toolbar variant="dense">
        <IconButton
          style={{ textDecoration: "none", color: "white" }}
          component={Link}
          to="/"
          edge="start"
          sx={{ mr: 1 }}
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
        <Stack direction="row" spacing={2}>
          <Button
            startIcon={<CollectionsIcon />}
            component={Link}
            to="/LegendLibrary"
            style={{ textDecoration: "none", color: "white" }}
          >
            Legend Library
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
