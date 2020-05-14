import React from "react";
import DeleteDialog from "./DeleteDialog";
import { deleteUser } from "../../Actions/UserActions";

type DeleteUserDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  userId: string;
};

export default function DeleteUserDialog(props: DeleteUserDialogProps) {
  const title = "Do you want to delete this user?";
  const description =
    "User (id: " +
    props.userId +
    ") and all his collections will be irreversibly deleted. Do you want to proceed?";
  return (
    <DeleteDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      confirmAction={() => {
        deleteUser(props.userId);
      }}
    />
  );
}
