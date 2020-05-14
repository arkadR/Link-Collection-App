import React from "react";
import SimpleDialog from "./SimpleDialog";
import { Button, TextField } from "@material-ui/core";

type ChangeMaxElementsDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  maxElements: number;
};

export default function ChangeMaxElementsDialog(
  props: ChangeMaxElementsDialogProps
) {
  const [maxElements, setMaxElements] = React.useState(props.maxElements);

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title="Change maximum number of elements"
      description={
        "Change maximum number of elements in the collection (now: " +
        props.maxElements +
        ")"
      }
      content={
        <TextField
          onChange={(e) =>
            setMaxElements((e.target.value as unknown) as number)
          }
          autoFocus
          margin="dense"
          id="maxElements"
          label="Maximum number of elements"
          type="number"
          placeholder={"" + props.maxElements}
          fullWidth
        />
      }
      actions={
        <Button
          disabled={maxElements === props.maxElements || maxElements < 0}
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
