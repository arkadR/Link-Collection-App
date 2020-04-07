import React, { ReactElement } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

type DrawerItemProps = {
  title: string;
  icon: ReactElement;
  nestedList: ReactElement;
};

export default function DrawerItem({
  title,
  icon,
  nestedList
}: DrawerItemProps) {
  const [open, setOpen] = React.useState(false);

  const toggleNestedItemsOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItem button onClick={toggleNestedItemsOpen}>
        <ListItemIcon children={icon} />
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} children={nestedList} timeout="auto" unmountOnExit />
    </div>
  );
}
