import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { toast } from "react-hot-toast";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../../redux/user/userSlice";
import LogOutDialog from "../dialog/Dialog";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, userId } = useSelector((state) => state.user);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [handleOpen, setHandleOpen] = useState(false);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      signOutUserStart();
      await axios
        .get(`${BASE_URL}/auth/logout/${userId}`, { withCredentials: true })
        .then((res) => {
          if (res.status == 200) {
            dispatch(signOutUserSuccess());
            navigate("/login");
            toast.success(res.data?.message);
          }
        })
        .catch(() => {
          dispatch(signOutUserFailure("Could Not Sign Out"));
        });
    } catch (error) {
      dispatch(signOutUserFailure("Something Went Wrong"));
    }
  };
  return (
    <Box sx={{ flexGrow: 1, zIndex: 50 }}>
      <LogOutDialog
        isOpen={handleOpen}
        handleLogout={handleLogout}
        setIsOpen={setHandleOpen}
        setAnchorElNav={setAnchorElNav}
      />
      <AppBar position="static">
        <Toolbar disableGutters sx={{ px: 2 }}>
          {/* collapsed view */}
          <Box>
            <Typography
              component={Link}
              to={"/"}
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 500,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Postgres Auth
            </Typography>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
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
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                overflowY: "scroll",
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/");
                  handleCloseNavMenu();
                }}
              >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              {!currentUser ? (
                <Box>
                  <MenuItem
                    onClick={() => {
                      navigate("/register");
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      navigate("/login");
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Box>
              ) : (
                <Box>
                  <MenuItem
                    onClick={() => {
                      navigate("/landing-page");
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setHandleOpen(true);
                      handleCloseNavMenu();
                    }}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Box>
              )}
            </Menu>
          </Box>

          {/* expanded view */}
          <Box sx={{ width: "100%" }}>
            <Typography
              component={Link}
              to={"/"}
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                fontWeight: 500,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Postgres Auth
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => navigate("/")}
              sx={{
                color: "inherit",
                fontSize: 17,
                textTransform: "capitalize",
                ":hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Home
            </Button>
            {!currentUser ? (
              <>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: 17,
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: 17,
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </>
            ) : (
              <Box sx={{ width: "100%", display: "flex" }}>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: 17,
                    ":hover": {
                      textDecoration: "underline",
                    },
                  }}
                  onClick={() => navigate("/landing-page")}
                >
                  Profile
                </Button>
                <Button
                  color="inherit"
                  sx={{
                    textTransform: "capitalize",
                    fontSize: 17,
                  }}
                  onClick={() => setHandleOpen(true)}
                >
                  Logout
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
