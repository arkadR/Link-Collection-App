import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
  MenuItem,
  makeStyles
} from "@material-ui/core";
import { ExitToApp, Settings, AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    width: 2300
  }
});

type AuthenticatedViewProps = {
  profilePath: string;
  userName: string;
  logoutPath: string;
};

export default function AuthenticatedView(props: AuthenticatedViewProps) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const openMenu = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget as Element);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Fragment>
        <Link
          // tag={Link}
          className="text-dark"
          to={props.profilePath}
          style={{ color: "white", textDecoration: "none" }}
        >
          Hello {props.userName}
        </Link>
        {/*
        // @ts-ignore */}
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
        className={classes.root}
      >
        <MenuItem onClick={closeMenu}>
          <Link
            // tag={Link}
            to={props.profilePath}
            style={{ color: "black", textDecoration: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </Link>
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          <Link
            // tag={Link}
            to={props.logoutPath}
            style={{ color: "black", textDecoration: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
