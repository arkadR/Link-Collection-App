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
  const title = "Change maximum number of collections";
  const description =
    "Change maximum number of collections a user can have (now: " +
    props.maxCollections +
    ")";
  const [maxCollections, setMaxCollections] = React.useState(
    props.maxCollections
  );

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      content={
        <TextField
          onChange={(e) =>
            setMaxCollections((e.target.value as unknown) as number)
          }
          autoFocus
          margin="dense"
          id="maxCollections"
          label="Maximum number of collections"
          type="number"
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
          color="secondary"
          autoFocus
        >
          Change
        </Button>
      }
    />
  );
}
