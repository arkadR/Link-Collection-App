import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
  MenuItem
} from "@material-ui/core";
import { ExitToApp, Settings, AccountCircle } from "@material-ui/icons";

export default function AuthenticatedView(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const openMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Fragment>
        <NavLink
          tag={Link}
          className="text-dark"
          to={props.profilePath}
          style={{ color: "white", textDecoration: "none" }}
        >
          Hello {props.userName}
        </NavLink>
        <IconButton color="inherit" onClick={openMenu}>
          <AccountCircle />
        </IconButton>
      </Fragment>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>
          <NavLink
            tag={Link}
            to={props.profilePath}
            style={{ color: "black", textDecoration: "none" }}
          >
            <ListItem dense>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </NavLink>
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <NavLink
            tag={Link}
            to={props.logoutPath}
            style={{ color: "black", textDecoration: "none" }}
          >
            <ListItem dense>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </NavLink>
        </MenuItem>
      </Menu>
    </div>
  );
}
