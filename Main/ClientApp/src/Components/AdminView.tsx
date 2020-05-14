import React, { useState, useEffect } from "react";
import UsersStore from "../Stores/UsersStore";
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  Collapse,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import ChangeMaxCollectionsDialog from "./Dialogs/ChangeMaxCollectionsDialog";
import ChangeMaxElementsDialog from "./Dialogs/ChangeMaxElementsDialog";

export default function AdminView() {
  const [users, setUsers] = useState(UsersStore.getUsers());
  //TODO: fetch Maximum number of collections
  const [maxCollections, setMaxCollections] = React.useState(-1);
  //TODO: fetch Maximum number of elements
  const [maxElements, setMaxElements] = React.useState(-1);
  const [usersExpandOpen, setUsersExpandOpen] = React.useState(false);
  const [changeElementsDialogOpen, setChangeElementsDialogOpen] = useState(
    false
  );
  const [
    changeCollectionsDialogOpen,
    setChangeCollectionsDialogOpen,
  ] = useState(false);

  const toggleUsersExpandOpen = () => {
    setUsersExpandOpen(!usersExpandOpen);
  };

  useEffect(() => {
    const changeHandler = () => {
      setUsers(UsersStore.getUsers());
    };
    UsersStore.addChangeListener(changeHandler);
    return () => UsersStore.removeChangeListener(changeHandler);
  }, []);

  return (
    <>
      <Grid
        style={{ padding: "25px 30px 25px 30px" }}
        container
        direction="row"
        spacing={3}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={6}>
          <Card elevation={3}>
            <CardHeader
              title="Number of collections"
              subheader={
                "Maximum number of collections a user can have is set to " +
                maxCollections
              }
            />
            <CardActions>
              <Button
                onClick={() => {
                  setChangeCollectionsDialogOpen(true);
                }}
                color="primary"
              >
                Change
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card elevation={3}>
            <CardHeader
              title="Number of elements"
              subheader={
                "Maximum number of elements in the collection is set to " +
                maxElements
              }
            />
            <CardActions>
              <Button
                onClick={() => {
                  setChangeElementsDialogOpen(true);
                }}
                color="primary"
              >
                Change
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card elevation={3}>
            <CardHeader
              title="Users"
              subheader={"Current number of users is  " + users.length}
            />
            <CardActions>
              <IconButton
                style={{ marginLeft: "auto" }}
                onClick={toggleUsersExpandOpen}
              >
                {usersExpandOpen ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </CardActions>
            <Collapse in={usersExpandOpen} timeout="auto" unmountOnExit>
              <List component="div">
                {users.map((u) => (
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>{u.name.toUpperCase().charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText>{u.email}</ListItemText>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Card>
        </Grid>
      </Grid>

      <ChangeMaxElementsDialog
        open={changeElementsDialogOpen}
        toggleDialogOpen={() =>
          setChangeElementsDialogOpen(!changeElementsDialogOpen)
        }
      />
      <ChangeMaxCollectionsDialog
        open={changeCollectionsDialogOpen}
        toggleDialogOpen={() =>
          setChangeCollectionsDialogOpen(!changeCollectionsDialogOpen)
        }
        maxCollections={maxCollections}
      />
    </>
  );
}
