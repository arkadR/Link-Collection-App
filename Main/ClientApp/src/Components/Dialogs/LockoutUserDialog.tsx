import React from "react";
import DeleteDialog from "./DeleteDialog";
import { lockoutUser } from "../../Actions/UserActions";

type LockoutUserDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  userId: string;
};

export default function LockoutUserDialog(props: LockoutUserDialogProps) {
  const title = "Do you want to lock out this user?";
  const description =
    "User (id: " +
    props.userId +
    ") will be unable to log in to the application for the next month. Do you want to proceed?";
  return (
    <DeleteDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      confirmAction={() => {
        lockoutUser(props.userId);
      }}
    />
  );
}
