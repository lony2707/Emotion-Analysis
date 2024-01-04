import { AppBar } from "@mui/material";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../dist/images/logo.svg";
import { useContextValue } from "./contextProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { allActionTypes } from "./reducer";

const Header = () => {
  const [{ user }, dispatch] = useContextValue();
  const navigate = useNavigate();

  const [pages, setPages] = useState([]);
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    if (user) {
      setPages(["dashboard", "admin", "help"]);
      setSettings(["Dashboard", "Help"]);
    } else {
      setPages(["admin", "login", "signup"]);
      setSettings(["Login", "SignUp", "Help"]);
    }
  }, [user]);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePageClick = (location) => {
    navigate("/" + location);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              component="a"
              sx={{
                mr: 2,
                cursor: "pointer",
                display: { xs: "none", md: "flex" },
              }}
            >
              <img
                onClick={() => navigate("/")}
                className="header-logo-image"
                src={logo}
                alt="Logo"
              />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <div
                      onClick={() => {
                        handleCloseNavMenu();
                        handlePageClick(page);
                      }}
                    >
                      <Typography textAlign="center">
                        {page.toUpperCase()}
                      </Typography>
                    </div>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <img className="header-logo-image" src={logo} alt="Logo" />
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    handlePageClick(page);
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user ? "Dev" : "User"}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      handlePageClick(setting);
                    }}
                  >
                    <Typography component="div" textAlign="center">
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}

                {user && (
                  <MenuItem
                    key={23232323232}
                    onClick={() => {
                      handleCloseUserMenu();
                      dispatch({ type: allActionTypes.LOGOUT_USER });
                      navigate("/");
                    }}
                  >
                    <Typography component="div" textAlign="center">
                      Logout
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="is-boxed ">
        <div className="body-wrap">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Header;
