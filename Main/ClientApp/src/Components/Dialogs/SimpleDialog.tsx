import React, { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";

type SimpleDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  title: string;
  description?: string;
  content?: ReactNode;
  actions?: ReactNode;
};

export default function SimpleDialog(props: SimpleDialogProps) {
  return (
    <Dialog open={props.open} onClose={props.toggleDialogOpen}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
        {props.content}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.toggleDialogOpen} color="primary">
          Cancel
        </Button>
        {props.actions}
      </DialogActions>
    </Dialog>
  );
}
