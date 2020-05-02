import React from "react";
import DeleteDialog from "./DeleteDialog";
import { deleteElement } from "../../Actions/ElementActions";

type DeleteElementDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
  elementId: number;
};

export default function DeleteElementDialog(props: DeleteElementDialogProps) {
  const title = "Do you want to delete this element?";
  const description =
    "This element will be irreversibly deleted. Do you want to proceed?";
  return (
    <DeleteDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      confirmAction={() => deleteElement(props.collectionId, props.elementId)}
    />
  );
}
