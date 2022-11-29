import "../App.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import MenuIcon from "@mui/icons-material/Menu";

function NavBar(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "rgb(239, 240, 222)",
        fontFamily: `'Reenie Beanie', cursive`,
        height: "75px",
      }}
    >
      <Toolbar>
        <Typography
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: `'Reenie Beanie', cursive`,
            fontSize: '22px',
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Link to="">
            <h1>After Thought</h1>
          </Link>
        </Typography>
        {/* <IconButton>
          <CreateIcon />
        </IconButton> */}

        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="black"
          sx={{
            marginLeft: '1050px'
        }}
        >
          <MenuIcon fontSize='large' />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {props.isLoggedIn === false && (
              <MenuItem onClick={handleClose}>
                <Link to="register">
                  <h2>Register</h2>
                </Link>
              </MenuItem>
            ) }
            {props.isLoggedIn === false && (
              <MenuItem onClick={handleClose}>
                <Link to="login">
                  <h2>Login</h2>
                </Link>
              </MenuItem>
            ) }

          <MenuItem onClick={handleClose}>
            <Link to="categories">
              <h2>Categories</h2>
            </Link>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
