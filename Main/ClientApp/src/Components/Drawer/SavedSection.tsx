import React from "react";
import DrawerItem from "./DrawerItem";
import { Save } from "@material-ui/icons";
import { List } from "@material-ui/core";

export default function SavedSection() {
  return (
    <DrawerItem
      title="Saved"
      icon={<Save />}
      nestedList={<List component="div" disablePadding></List>}
    />
  );
}
