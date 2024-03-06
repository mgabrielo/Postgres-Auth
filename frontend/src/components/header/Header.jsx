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
import { signInStart, signOutUserSuccess } from "../../redux/user/userSlice";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { toast } from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, userId } = useSelector((state) => state.user);
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      signInStart();
      await axios
        .get(`${BASE_URL}/auth/logout/${userId}`, { withCredentials: true })
        .then((res) => {
          if (res.status == 200) toast.success(res.data?.message);
          dispatch(signOutUserSuccess());
          navigate("/login");
        })
        .catch(() => {
          signOutUserFailure("Could Not Sign Out");
        });
    } catch (error) {
      signOutUserFailure("Something Went Wrong");
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
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
              <MenuItem onClick={() => navigate("/")}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              {!currentUser ? (
                <MenuItem onClick={() => navigate("/login")}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              ) : (
                <Box>
                  <MenuItem onClick={() => navigate("/landing-page")}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
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
                  onClick={handleLogout}
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
