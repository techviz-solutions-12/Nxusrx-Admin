import { useContext, useEffect, useMemo, useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import "./sidebar.scss";
import { ListItemIcon } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import dashboardIcon from "../../../assets/images/dahsboard.svg";
import {
  connectionWithSocketServer,
  socketServer,
} from "../../../realtimeCommunication/socketConnection";
import userProfile from "../../../assets/images/userProfile.svg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import nxusLogo from "../../../assets/images/nxus-logo.png";

import sideNavData from "../../../nav";

const drawerWidth = 240;

export const Sidebar = () => {
  const location = useLocation();
  const history = useNavigate();
  const { user } = useSelector((state) => state.auth);



  const isActive = (value) => (location?.pathname === value ? "active" : "");
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: "1201",
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", marginY: "15px" }}>
        {" "}
        <img src={nxusLogo} className="nxusLogo" />
      </Box>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {sideNavData && sideNavData.length > 0 ? (
            sideNavData.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                className={isActive(`${item?.link_to}`)}
                onClick={() => history(`${item?.link_to}`, { replace: true })}
              >
                <ListItemButton>
                  <ListItemIcon>{item?.icon}</ListItemIcon>
                  <ListItemText>{item?.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem
              disablePadding
              className={isActive("/profile")}
              onClick={() => history("/dash/profile", { replace: true })}
            >
              <ListItemButton>
                <ListItemIcon>
                  <img src={userProfile} />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
