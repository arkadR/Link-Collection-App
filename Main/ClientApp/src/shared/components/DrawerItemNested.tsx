import React, { ReactElement } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from "@material-ui/core";
import { Clear, MoreVert } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4)
    }
  })
);

type DrawerItemNestedProps = {
  title: string;
  icon?: ReactElement;
};

export default function DrawerItemNested({
  title,
  icon
}: DrawerItemNestedProps) {
  const classes = useStyles();
  return (
    <ListItem button className={classes.nested}>
      {icon != null ? (
        <ListItemIcon children={icon} />
      ) : (
        <ListItemIcon children={<Clear style={{ visibility: "hidden" }} />} />
      )}
      <ListItemText primary={title} />
      <IconButton color="inherit">
        <MoreVert />
      </IconButton>
    </ListItem>
  );
}
