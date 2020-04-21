import React from "react";
import DeleteDialog from "./DeleteDialog";
import { deleteCollection } from "../../Actions/Actions";

type DeleteCollectionDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
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
      confirmAction={() => deleteCollection(props.collectionId)}
    />
  );
}
