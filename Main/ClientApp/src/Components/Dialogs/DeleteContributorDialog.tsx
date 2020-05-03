import React from "react";
import DeleteDialog from "./DeleteDialog";

type DeleteContributorDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
  userId: number;
  additionalCancelAction?: () => void;
};

export default function DeleteContributorDialog(
  props: DeleteContributorDialogProps
) {
  const title = "Do you want to delete this contributor?";
  const description =
    "This contributor will lose permissions to this collection. Do you want to proceed?";
  return (
    <DeleteDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      //TODO: confirm action
      confirmAction={() => {}}
      additionalCancelAction={props.additionalCancelAction}
      title={title}
      description={description}
    />
  );
}
