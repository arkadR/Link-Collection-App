import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

type ListItemAddProps = {
  onClickHandler: () => void;
  text: string;
  className?: string;
};

export default function ListItemAdd(props: ListItemAddProps) {
  return (
    <ListItem button onClick={() => props.onClickHandler()}>
      <ListItemAvatar className={props.className}>
        <Avatar>
          <AddIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={props.text} />
    </ListItem>
  );
}
