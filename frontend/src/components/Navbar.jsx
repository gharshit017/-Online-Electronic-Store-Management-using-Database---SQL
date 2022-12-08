import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import {
  Adb as AdbIcon,
  Menu as MenuIcon,
  Store as StoreIcon,
} from "@mui/icons-material";
import { useState, useContext } from "react";
import { AppContext } from "../context";
import { NavLink, Link } from "./index";

const pages = ["Products", "Pricing", "Blog"];
const settings = [
  { title: "Profile", link: "/customer/profile" },
  { title: "My Orders", link: "/customer/orders" },
  { title: "Logout", link: "/logout" },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { customer } = useContext(AppContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StoreIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <NavLink to="/">
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 600,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Online Store
            </Typography>
          </NavLink>

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
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Stack
            direction={"row"}
            columnGap={2}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <NavLink to="/products">Products</NavLink>
            {customer?.role === "admin" && (
              <NavLink to="/product/add">Add Product</NavLink>
            )}
          </Stack>

          <Box sx={{ flexGrow: 0 }}>
            {customer ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={customer.name}
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
                    <MenuItem key={setting.title} onClick={handleCloseUserMenu}>
                      <Link to={`${setting.link}`}>
                        <Typography textAlign="center">
                          {setting.title}
                        </Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <NavLink to="/">Sign In</NavLink>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
