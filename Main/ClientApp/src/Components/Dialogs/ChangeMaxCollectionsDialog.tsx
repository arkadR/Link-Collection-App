import React from "react";
import SimpleDialog from "./SimpleDialog";
import { Button, TextField } from "@material-ui/core";

type ChangeMaxCollectionsDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  maxCollections: number;
};

export default function ChangeMaxCollectionsDialog(
  props: ChangeMaxCollectionsDialogProps
) {
  const [maxCollections, setMaxCollections] = React.useState(
    props.maxCollections
  );

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title="Change maximum number of collections"
      description={
        "Change maximum number of collections a user can have (now: " +
        props.maxCollections +
        ")"
      }
      content={
        <TextField
          onChange={(e) =>
            setMaxCollections((e.target.value as unknown) as number)
          }
          autoFocus
          margin="dense"
          id="elementName"
          label="Maximum number of collections"
          type="number"
          //TODO: add maximum number of collections placeholder
          placeholder={"" + props.maxCollections}
          fullWidth
        />
      }
      actions={
        <Button
          disabled={
            maxCollections === props.maxCollections || maxCollections < 0
          }
          onClick={() => {
            //TODO: on click
          }}
          color="primary"
          autoFocus
        >
          Change
        </Button>
      }
    />
  );
}
