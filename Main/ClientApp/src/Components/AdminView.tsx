import React, { useState, useEffect } from "react";
import UsersStore from "../Stores/UsersStore";
import ConfigurationStore from "../Stores/ConfigurationStore";
import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  Button,
  IconButton,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import { Lock } from "@material-ui/icons";
import ChangeMaxCollectionsDialog from "./Dialogs/ChangeMaxCollectionsDialog";
import ChangeMaxElementsDialog from "./Dialogs/ChangeMaxElementsDialog";
import LockoutUserDialog from "./Dialogs/LockoutUserDialog";

export default function AdminView() {
  const [users, setUsers] = useState(UsersStore.getUsers());
  const [configuration, setConfiguration] = useState(
    ConfigurationStore.getConfiguration()
  );

  let maxElements = configuration?.maxElementsInCollection;
  let maxCollections = configuration?.maxCollectionsPerUser;

  const [lockoutUserDialogOpen, setLockoutUserDialogOpen] = React.useState(
    false
  );
  const [selectedUserId, setSelectedUserId] = useState("");
  const [changeElementsDialogOpen, setChangeElementsDialogOpen] = useState(
    false
  );
  const [
    changeCollectionsDialogOpen,
    setChangeCollectionsDialogOpen,
  ] = useState(false);

  const onLockoutUserClick = (userId: string) => {
    setSelectedUserId(userId);
    setLockoutUserDialogOpen(true);
  };

  useEffect(() => {
    const usersChangeHandler = () => {
      setUsers(UsersStore.getUsers());
    };
    const configurationChangeHander = () => {
      setConfiguration(ConfigurationStore.getConfiguration());
    };
    UsersStore.addChangeListener(usersChangeHandler);
    ConfigurationStore.addChangeListener(configurationChangeHander);
    return () => {
      UsersStore.removeChangeListener(usersChangeHandler);
      ConfigurationStore.removeChangeListener(configurationChangeHander);
    };
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

        <Grid item xs={12}>
          <Card elevation={3}>
            <CardHeader
              title="Users"
              subheader={"Current number of users is  " + users.length}
            />
            <Divider />
            <TableContainer component={Paper} style={{ maxHeight: "500px" }}>
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell variant="head">
                      <b>Name</b>
                    </TableCell>
                    <TableCell>
                      <b>Email</b>
                    </TableCell>
                    <TableCell>
                      <b>Id</b>
                    </TableCell>
                    <TableCell align="right">
                      <b>Actions</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.id}</TableCell>
                      {/* IDEA: admin can't be deleted */}
                      <TableCell align="right">
                        {user.isLockedOut !== true && (
                          <IconButton
                            onClick={() => {
                              onLockoutUserClick(user.id);
                            }}
                          >
                            <Lock />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      <ChangeMaxElementsDialog
        open={changeElementsDialogOpen}
        toggleDialogOpen={() =>
          setChangeElementsDialogOpen(!changeElementsDialogOpen)
        }
        maxElements={maxElements ?? -1}
        onValueChange={(val: number) =>
          ConfigurationStore.setMaxElementsInCollection(val)
        }
      />
      <ChangeMaxCollectionsDialog
        open={changeCollectionsDialogOpen}
        toggleDialogOpen={() =>
          setChangeCollectionsDialogOpen(!changeCollectionsDialogOpen)
        }
        maxCollections={maxCollections ?? -1}
        onValueChange={(val: number) =>
          ConfigurationStore.setMaxCollectionsPerUser(val)
        }
      />
      <LockoutUserDialog
        open={lockoutUserDialogOpen}
        toggleDialogOpen={() =>
          setLockoutUserDialogOpen(!lockoutUserDialogOpen)
        }
        userId={selectedUserId}
      />
    </>
  );
}
