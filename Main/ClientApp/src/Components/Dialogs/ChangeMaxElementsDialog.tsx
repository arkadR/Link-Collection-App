import React from "react";
import SimpleDialog from "./SimpleDialog";
import { Button } from "@material-ui/core";
import NumberInput from "../Common/NumberInput";

type ChangeMaxElementsDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  maxElements: number;
  onValueChange: (val: number) => void;
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

  useEffect(() => {
    setMaxElements(props.maxElements);
  }, [props.maxElements]);

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      content={
        <NumberInput
          value={maxElements}
          onChange={(val) => setMaxElements(val)}
        />
      }
      actions={
        <Button
          disabled={
            maxElements === props.maxElements ||
            ((maxElements as unknown) as number) < 0
          }
          onClick={() => {
            props.onValueChange(maxElements);
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
