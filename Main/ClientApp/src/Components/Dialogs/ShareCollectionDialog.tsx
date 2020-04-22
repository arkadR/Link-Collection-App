import React, { useState, ChangeEvent, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SimpleDialog from "./SimpleDialog";
import { shareCollection } from "../../Actions/Actions";
import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Grid,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SharedCollectionData } from "../../Model/SharedCollection";
import UsersStore from "../../Stores/UsersStore";
import { User } from "../../Model/User";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginLeft: theme.spacing(2),
      minWidth: 100,
    },
  })
);

type ShareCollectionDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
};

export default function ShareCollectionDialog(
  props: ShareCollectionDialogProps
) {
  const classes = useStyles();
  const title = "Share collection";
  const description = `You can share this collection with others for them to see and edit. 
    After sharing, the collection will be visible in their "Shared with me" section.`;
  const selectView = "View";
  const selectEdit = "Edit";
  const inputLabel = "User can:";

  const createSharedCollectionData = () => {
    return {
      collectionId: props.collectionId,
      userId: selectedUser!.id,
      viewRights: true,
      editRights: selectedRights === selectEdit,
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

  const [selectedRights, setSelectedRights] = useState<string>(selectView);
  const onRightsSelectChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedRights(event.target.value as string);
  };
  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      content={
        <Grid container direction="row" alignItems="center">
          <Autocomplete
            style={{ flex: "1" }}
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
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="rights-select">{inputLabel}</InputLabel>
            <Select
              labelId="rights-select"
              value={selectedRights}
              onChange={onRightsSelectChange}
              label={inputLabel}
            >
              <MenuItem value={selectView}>{selectView}</MenuItem>
              <MenuItem value={selectEdit}>{selectEdit}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
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
