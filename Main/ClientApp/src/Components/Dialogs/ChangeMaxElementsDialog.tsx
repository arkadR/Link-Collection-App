import React from "react";
import SimpleDialog from "./SimpleDialog";
import { Button, TextField } from "@material-ui/core";
import { changeValue } from "../../Actions/ConfigurationActions";

type ChangeMaxElementsDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  maxElements: string;
};

export default function ChangeMaxElementsDialog(
  props: ChangeMaxElementsDialogProps
) {
  const title = "Change maximum number of elements";
  const description =
    "Change maximum number of elements in the collection (now: " +
    props.maxElements +
    ")";
  const [maxElements, setMaxElements] = React.useState(props.maxElements);

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      content={
        <TextField
          onChange={(e) => setMaxElements(e.target.value)}
          autoFocus
          margin="dense"
          id="maxElements"
          label="Maximum number of elements"
          type="number"
          placeholder={"" + props.maxElements}
          defaultValue={"" + props.maxElements}
          fullWidth
        />
      }
      actions={
        <Button
          disabled={
            maxElements === props.maxElements ||
            ((maxElements as unknown) as number) < 0
          }
          onClick={() => changeValue("MaxElements", maxElements)}
          color="secondary"
          autoFocus
        >
          Change
        </Button>
      }
    />
  );
}
