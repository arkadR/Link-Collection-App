import React, { useState, ChangeEvent, useEffect } from "react";
import SimpleDialog from "./SimpleDialog";
import { shareCollection } from "../../Actions/Actions";
import { Button, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SharedCollectionData } from "../../Model/SharedCollection";
import UsersStore from "../../Stores/UsersStore";

type ShareCollectionDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
};

export default function ShareCollectionDialog(
  props: ShareCollectionDialogProps
) {
  const title = "Share collection";
  const description = `You can share this collection with others for them to see and edit. 
    After sharing, the collection will be visible in their "Shared with me" section.`;

  const createSharedCollectionData = () => {
    return {
      collectionId: props.collectionId,
      userId: selectedUser!.id,
      viewRights: true,
      editRights: true,
    } as SharedCollectionData;
  };

  const [users, setUsers] = useState(UsersStore.getUsers());
  useEffect(() => {
    const changeHandler = () => {
      setUsers(UsersStore.getUsers());
    };
    UsersStore.addChangeListener(changeHandler);
    return () => UsersStore.removeChangeListener(changeHandler);
  }, []);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const onUserInputChange = (event: ChangeEvent<{}>, newUser: User | null) => {
    setSelectedUser(newUser);
  };
  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      content={
        <Autocomplete
          options={users}
          getOptionLabel={(user) => user.email}
          id="auto-select"
          autoSelect
          value={selectedUser}
          onChange={onUserInputChange}
          renderInput={(params) => (
            <TextField {...params} label="User" margin="normal" />
          )}
        />
      }
      actions={
        <Button
          disabled={selectedUser === null}
          onClick={() => {
            shareCollection(createSharedCollectionData());
            props.toggleDialogOpen();
          }}
          color="primary"
          autoFocus
        >
          Share
        </Button>
      }
    ></SimpleDialog>
  );
}

type User = {
  id: string;
  name: string;
  email: string;
};
