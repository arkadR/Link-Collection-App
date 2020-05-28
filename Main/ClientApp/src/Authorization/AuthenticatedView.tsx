import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
} from "@material-ui/core";
import Switch from "react-switch";
import {
  ExitToApp,
  Settings,
  AccountCircle,
  WbSunny,
  Brightness3,
} from "@material-ui/icons";
import { useCookie } from "../Infrastructure/CustomReactHooks";

const useStyles = makeStyles({
  root: {
    width: 2300,
  },
});

type AuthenticatedViewProps = {
  profilePath: string;
  userName: string;
  logoutPath: string;
};

export default function AuthenticatedView(props: AuthenticatedViewProps) {
  const [darkMode, setDarkMode] = useCookie("darkmode", false);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

  const toggleSwitch = () => {
    setDarkMode(!darkMode);
  };

  const openMenu = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget as Element);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Fragment>
        <Link
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
        {/* https://ecstatic-elion-0c620b.netlify.app/dark-theme/ */}
        <Switch
          checked={darkMode}
          onChange={toggleSwitch}
          onColor="#222"
          offColor="#333"
          checkedIcon={<Brightness3 style={{ fill: "yellow" }} />}
          uncheckedIcon={<WbSunny style={{ fill: "yellow" }} />}
          boxShadow="0 0 2px 3px #B38CD9"
          activeBoxShadow="0 0 2px 3px #dfb3e6"
        />
      </Fragment>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
        className={classes.root}
      >
        <ListItem
          button
          component={Link}
          to={props.profilePath}
          onClick={closeMenu}
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to={props.logoutPath}
          onClick={closeMenu}
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </Menu>
    </>
  );
}
