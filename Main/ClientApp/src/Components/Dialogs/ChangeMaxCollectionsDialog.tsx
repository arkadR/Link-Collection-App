import React, { useEffect } from "react";
import SimpleDialog from "./SimpleDialog";
import { Button } from "@material-ui/core";
import NumberInput from "../Common/NumberInput";

type ChangeMaxCollectionsDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  maxCollections: number;
  onValueChange: (val: number) => void;
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

  useEffect(() => {
    setMaxCollections(props.maxCollections);
  }, [props.maxCollections]);

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      content={
        <NumberInput
          value={maxCollections}
          onChange={(val) => setMaxCollections(val)}
        />
      }
      actions={
        <Button
          disabled={
            maxCollections === props.maxCollections || maxCollections <= 0
          }
          onClick={() => {
            props.onValueChange(maxCollections);
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
