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
  const title = "Do you want to delete this collection?";
  const description =
    "Collection and all it content will be irreversibly deleted. Do you want to proceed?";
  return (
    <DeleteDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      confirmAction={props.confirmAction}
    />
  );
}
