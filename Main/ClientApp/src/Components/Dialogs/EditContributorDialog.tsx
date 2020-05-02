import React, { useState, ChangeEvent, useEffect } from "react";
import SimpleDialog from "./SimpleDialog";
import { shareCollection } from "../../Actions/CollectionActions";
import {
  Button,
  TextField,
  Avatar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  makeStyles,
  Theme,
  createStyles,
  Grid,
} from "@material-ui/core";
import {
  Lock,
  Widgets,
  Public,
  GroupAdd,
  Person,
  Delete,
  Edit,
  LockOpen,
} from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  SharedCollectionData,
  SharedCollection,
} from "../../Model/SharedCollection";
import SharedCollectionStore from "../../Stores/SharedCollectionsStore";
import { User } from "../../Model/User";
import UsersStore from "../../Stores/UsersStore";

type EditContributorDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
  userId: number;
};

enum UserRights {
  ViewRights,
  EditRights,
}

enum Mode {
  Edit,
  Delete,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBlockEnd: "10px",
    },
  })
);

export default function EditContributorDialog(
  props: EditContributorDialogProps
) {
  const [mode, setMode] = useState(Mode.Edit);
  const [
    sharedCollection,
    setSharedCollection,
  ] = useState<SharedCollection | null>(null);

  const changeMode = (mode: Mode) => {
    setMode(mode);
  };

  useEffect(() => {
    setSharedCollection(
      SharedCollectionStore.getContributorSharedCollection(
        props.collectionId,
        props.userId
      )
    );
    const changeHandler = () => {
      setSharedCollection(
        SharedCollectionStore.getContributorSharedCollection(
          props.collectionId,
          props.userId
        )
      );
    };

    SharedCollectionStore.addChangeListener(changeHandler);
    return () => {
      SharedCollectionStore.removeChangeListener(changeHandler);
    };
  }, [props.collectionId, props.userId]);

  return (
    <>
      {mode === Mode.Edit
        ? EditModeView(props, changeMode)
        : DeleteModeView(props)}
    </>
  );
}

function EditModeView(
  props: EditContributorDialogProps,
  changeMode: (mode: Mode) => void
) {
  const classes = useStyles();
  const title = "Edit contributor";
  const description = `You can change contributor permissions or delete this contributor`;

  //TODO: initial state change to actual userrights
  const [selectedUserRights, setUserRights] = useState(UserRights.ViewRights);
  const onUserRightsChange = (event: React.ChangeEvent<{ value: any }>) => {
    setUserRights(event.target.value);
  };

  const createSharedCollectionData = () => {
    return {
      collectionId: props.collectionId,
      userId: props.userId,
      editRights: selectedUserRights === UserRights.EditRights,
    } as SharedCollectionData;
  };

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      content={
        <Grid container spacing={3} className={classes.root}>
          <Grid item xs={8}>
            <Avatar>
              <Person />
            </Avatar>
          </Grid>
          {/* TODO: change to user name */}
          {props.userId}
          <Grid item xs={4}>
            <FormControl>
              <InputLabel>Permissions</InputLabel>
              <Select value={selectedUserRights} onChange={onUserRightsChange}>
                <MenuItem value={UserRights.ViewRights}>View Rights</MenuItem>
                <MenuItem value={UserRights.EditRights}>Edit Rights</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      }
      actions={
        //TODO: validation if rights  changed
        <>
          <Button
            onClick={() => {
              // editSharedCollection(createSharedCollectionData());
              props.toggleDialogOpen();
            }}
            color="primary"
            autoFocus
          >
            Change
          </Button>
          <Button
            onClick={() => {
              changeMode(Mode.Delete);
            }}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </>
      }
    />
  );
}

function DeleteModeView(props: EditContributorDialogProps) {
  return <></>;
}
