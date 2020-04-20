import React, { ReactElement, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
} from "@material-ui/core";
import { Clear, MoreVert } from "@material-ui/icons";
import { Link } from "react-router-dom";

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
  menuItems: ReactElement;
  link: string;
};

export default function DrawerItemNested(props: DrawerItemNestedProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const onMenuOpen = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget as Element);
  };
  const onMenuClose = () => setAnchorEl(null);
  return (
    <>
      <ListItem button className={classes.nested}>
        {/* <Link to={props.link} className={classes.link}> */}
        {props.icon != null ? (
          <ListItemIcon children={props.icon} />
        ) : (
          <ListItemIcon children={<Clear style={{ visibility: "hidden" }} />} />
        )}
        <ListItemText primary={props.title} />
        {/* </Link> */}
        {/*
        // @ts-ignore */}
        <IconButton color="inherit" onClick={onMenuOpen}>
          <MoreVert />
        </IconButton>
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
