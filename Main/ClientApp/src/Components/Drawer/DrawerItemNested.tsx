import React, { ReactElement, useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Menu,
} from "@material-ui/core";
import { Clear, MoreVert } from "@material-ui/icons";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
    link: {
      color: "black",
      textDecoration: "none",
    },
  })
);

type DrawerItemNestedProps = {
  title: string;
  icon?: ReactElement;
  menuItems?: ReactElement;
  link: string;
};

export default function DrawerItemNested(props: DrawerItemNestedProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [redirectToCollection, setRedirectToCollection] = useState<boolean>(
    false
  );
  const onMenuOpen = (event: MouseEvent) => {
    if (props.menuItems) setAnchorEl(event.currentTarget as Element);
  };
  const onMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    setRedirectToCollection(false);
  }, [redirectToCollection]);

  return (
    <>
      {redirectToCollection && <Redirect push to={props.link} />}
      <ListItem
        button
        className={classes.nested}
        onClick={() => setRedirectToCollection(true)}
      >
        {props.icon != null ? (
          <ListItemIcon children={props.icon} />
        ) : (
          <ListItemIcon children={<Clear style={{ visibility: "hidden" }} />} />
        )}
        <ListItemText primary={props.title} />
        <ListItemSecondaryAction>
          {/*
          // @ts-ignore */}
          <IconButton color="inherit" onClick={onMenuOpen}>
            <MoreVert />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Menu
        open={anchorEl !== null}
        anchorEl={anchorEl}
        onClose={onMenuClose}
        PaperProps={{
          style: {
            maxHeight: 350,
          },
        }}
      >
        {props.menuItems}
      </Menu>
    </>
  );
}
