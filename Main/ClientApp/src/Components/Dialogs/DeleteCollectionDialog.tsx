import React from "react";
import DeleteDialog from "./DeleteDialog";

type DeleteCollectionDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  confirmAction: () => void;
};

export default function DeleteCollectionDialog(
  props: DeleteCollectionDialogProps
) {
  return (
    <DeleteDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title="Do you want to delete this collection?"
      description={
        "Collection and all it content will be irreversibly deleted. Do you want to proceed?"
      }
      confirmAction={props.confirmAction}
    />
  );
}
