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

export default function AdminView() {
  const [users, setUsers] = useState(UsersStore.getUsers());
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
              // TODO: add Maximum number of collections
              subheader="Maximum number of collections a user can have is set to "
            />
            <CardActions>
              <Button onClick={() => {}} color="primary">
                Change
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card elevation={3}>
            <CardHeader
              title="Number of elements"
              //TODO: add Maximum number of elements
              subheader="Maximum number of elements in the collection is set to  "
            />
            <CardActions>
              <Button onClick={() => {}} color="primary">
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
    </>
  );
}
