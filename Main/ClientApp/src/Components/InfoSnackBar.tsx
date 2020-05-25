import React, { ReactElement, useState, useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Dispatcher from "../Infrastructure/Dispatcher";
import Action from "../Infrastructure/Action";
import ActionTypes from "../Actions/ActionTypes";
import SnackbarSeverity from "../Actions/SnackbarSeverity";

interface InfoSnackBarProps {}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function InfoSnackBar(props: InfoSnackBarProps): ReactElement {
  const [severity, setSeverity] = useState(SnackbarSeverity.INFO);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (action: Action) => {
      if (action.actionType === ActionTypes.DISPLAY_MESSAGE) {
        setMessage(action.payload.message);
        setSeverity(action.payload.severity ?? SnackbarSeverity.INFO);
        setSnackbarOpen(true);
      }
    };

    const id = Dispatcher.register(handler);
    return () => Dispatcher.unregister(id);
  }, []);

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={snackbarOpen}
      onClose={handleClose}
      autoHideDuration={3000}
      message={message}
    >
      <>
        {/*
        // @ts-ignore */}
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </>
    </Snackbar>
  );
}
