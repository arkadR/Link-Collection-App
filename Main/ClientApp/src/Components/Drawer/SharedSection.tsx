import React from "react";
import DrawerItem from "./DrawerItem";
import { People } from "@material-ui/icons";
import { List } from "@material-ui/core";

export default function SharedSection() {
  return (
    <DrawerItem
      title="Shared with me"
      icon={<People />}
      nestedList={<List component="div" disablePadding></List>}
    />
  );
}
