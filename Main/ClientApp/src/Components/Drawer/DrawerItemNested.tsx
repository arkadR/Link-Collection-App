import React, { ReactElement, useState, ReactNode } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
} from "@material-ui/core";
import { Clear, MoreVert } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

type DrawerItemNestedProps = {
  title: string;
  icon?: ReactElement;
  menuItems: ReactElement;
};

export default function DrawerItemNested(props: DrawerItemNestedProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const onMenuOpen = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget as Element);
  };
  const onMenuClose = () => setAnchorEl(null);
  return (
    <ListItem button className={classes.nested}>
      {props.icon != null ? (
        <ListItemIcon children={props.icon} />
      ) : (
        <ListItemIcon children={<Clear style={{ visibility: "hidden" }} />} />
      )}
      <ListItemText primary={props.title} />
      {/*
        // @ts-ignore */}
      <IconButton color="inherit" onClick={onMenuOpen}>
        <MoreVert />
      </IconButton>
      <Menu open={anchorEl !== null} anchorEl={anchorEl} onClose={onMenuClose}>
        {props.menuItems}
      </Menu>
    </ListItem>
  );
}
