import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import "./header.scss";
import { ExpandMore } from "@mui/icons-material";
import { resetStore } from "../../../services/combinedAuth";
import {
  getAdminNotificationList,
  updateAdminNotification,
  logout,
  updateSession,
} from "../../../services/auth";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import moment from "moment";
import { store } from "../../../redux/store";
import { Tooltip } from "@mui/material";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard"];

const Header = () => {
  const { user, isSessionExpired } = useSelector((state) => state?.auth);
  const response = useSelector((state) => state?.auth?.notifications?.response);
  const loading = useSelector((state) => state?.auth?.notifications?.loading);
  const updateLoading = useSelector(
    (state) => state?.auth?.updateNotifications?.loading
  );
  const dispatch = useDispatch();
  const history = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [notificationLoading, setNotificationLoading] = useState(false);

  const [state, setState] = useState({
    notifications: response?.notifications,
    count: response?.count,
    unReadCount: response?.unReadCount,
  });
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openNotification = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(
      updateAdminNotification(function (res) {
        if (res) {
          setState({ ...state, unReadCount: 0 });
        }
      })
    );
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    dispatch(getAdminNotificationList(page, limit, function (res) {}));
  }, []);

  useEffect(() => {
    if (isSessionExpired) {
      let action = "USER_LOGOUT";
      window.confirm("Session is expired !");
      dispatch(resetStore(action, history));
      dispatch(
        logout(function () {
          dispatch(updateSession(false));
        })
      );
      history("/login");
    }
  }, [isSessionExpired]);

  useEffect(() => {
    setState({
      ...state,
      notifications: response?.notifications,
      count: response?.count,
      unReadCount: response?.unReadCount,
    });
  }, [response]);

  const handleLogin = () => {
    history("/login", { replace: true });
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  const handleLogOut = () => {
    let action = "USER_LOGOUT";
    dispatch(logout(function () {}));
    dispatch(resetStore(action));

    history("/login", { replace: true });
  };

  const handleNotification = (notif) => {
    if (notif) {
      setNotificationLoading(true);
      setTimeout(() => {
        setNotificationLoading(false);
        let str = notif?.doc?.for_page;
        let check = str?.includes("/");
        let modId = notif?.doc?.typeId ? notif?.doc?.typeId : "";
        let randomNum = Math.floor(Math.random() * 90000) + 10000;
        if (check) {
          history(`${notif?.doc?.for_page}&ranId=${randomNum}`);
        } else {
          history(`/${notif?.doc?.for_page}?modId=${modId}&ranId=${randomNum}`);
        }
      }, 1000);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#fff",
      }}
    >
      <Container maxWidth="100">
        <Toolbar disableGutters sx={{ paddingLeft: "240px" }}>
          <Box sx={{ flex: 1 }}>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <img src={nxusLogo} className="nxusLogo" />
                    </Typography> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {user && user?.token ? user?.company?.company_name : "Logo"}
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
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {notificationLoading ? (
            <CircularProgress />
          ) : (
            <Tooltip
              title={<div style={{ fontSize: "12px" }}>Notifications</div>}
              placement="top"
            >
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                {state?.unReadCount > 0 ? (
                  <Badge badgeContent={state?.unReadCount} color="error">
                    <NotificationsNoneIcon
                      sx={{ color: "#007bff", fontSize: "32px" }}
                    />
                  </Badge>
                ) : (
                  <NotificationsNoneIcon
                    sx={{ color: "#007bff", fontSize: "32px" }}
                  />
                )}
              </IconButton>
            </Tooltip>
          )}

          <Menu
            className="notification-menu"
            anchorEl={anchorEl}
            open={openNotification}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
              },
            }}
          >
            <Box className="notification-header">
              <Typography
                className="notification-label"
                variant="subtitle1"
                gutterBottom
              >
                Notifications
              </Typography>
              {state?.unReadCount > 0 ? (
                <Chip label={state?.unReadCount} color="primary" size="small" />
              ) : (
                <Box></Box>
              )}
            </Box>
            <Box sx={{ maxHeight: "350px", overflow: "auto" }}>
              {state?.notifications?.length > 0 ? (
                state?.notifications?.map((notify) => (
                  <MenuItem onClick={handleClose}>
                    <Box
                      width="100%"
                      onClick={() => {
                        handleNotification(notify);
                      }}
                    >
                      <Box display="flex" flexDirection="column">
                        <Box component="div">
                          <Typography
                            variant="subtitle2"
                            sx={{ whiteSpace: "break-spaces" }}
                          >
                            {notify?.message}
                          </Typography>
                        </Box>
                        <Box component="div">
                          <Typography
                            className="notification-label"
                            variant="caption"
                            gutterBottom
                          >
                            {`${moment(notify?.createdAt).fromNow()}`}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </MenuItem>
                ))
              ) : (
                <MenuItem onClick={handleClose}>
                  <Box display="flex" flexDirection="column">
                    <Box component="Box" sx={{ whiteSpace: "normal" }}>
                      <Typography variant="subtitle2">
                        No Notifications
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              )}
              <Divider />
            </Box>
          </Menu>
          {user && user?._id && (
            <IconButton size="large" onClick={handleOpenUserMenu}>
              <AccountCircleIcon sx={{ color: "#007bff", fontSize: "32px" }} />
              <Typography pl={1}>{user?.first_name}</Typography>
              <ExpandMore />
            </IconButton>
          )}

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
              <MenuItem key={setting} onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>

          {user && user?._id ? (
            <Button
              variant="contained"
              // className="containedPrimary"
              style={{ backgroundColor: "#333" }}
              onClick={handleLogOut}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              className="containedPrimary"
              onClick={handleLogin}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
