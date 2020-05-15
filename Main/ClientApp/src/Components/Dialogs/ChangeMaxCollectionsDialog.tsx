import React from "react";
import SimpleDialog from "./SimpleDialog";
import { Button, TextField } from "@material-ui/core";
import { changeValue } from "../../Actions/ConfigurationActions";

type ChangeMaxCollectionsDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  maxCollections: string;
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
          onChange={(e) => setMaxCollections(e.target.value)}
          autoFocus
          margin="dense"
          id="maxCollections"
          label="Maximum number of collections"
          type="number"
          placeholder={"" + props.maxCollections}
          defaultValue={"" + props.maxCollections}
          fullWidth
        />
      }
      actions={
        <Button
          disabled={
            maxCollections === props.maxCollections ||
            ((maxCollections as unknown) as number) < 0
          }
          onClick={() => {
            changeValue("MaxCollections", maxCollections);
            props.toggleDialogOpen();
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
