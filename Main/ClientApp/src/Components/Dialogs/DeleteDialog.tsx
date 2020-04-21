import React from "react";
import SimpleDialog from "./SimpleDialog";
import { Button } from "@material-ui/core";

type DeleteDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  confirmAction: () => void;
  title: string;
  description?: string;
};

export default function DeleteDialog(props: DeleteDialogProps) {
  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={props.title}
      description={props.description}
      actions={
        <Button
          onClick={() => {
            props.confirmAction();
            props.toggleDialogOpen();
          }}
          color="secondary"
          autoFocus
        >
          Confirm
        </Button>
      }
    />
  );
}
