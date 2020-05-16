import React, { ReactElement, useState, useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import Dispatcher from "../Infrastructure/Dispatcher";
import Action from "../Infrastructure/Action";
import ActionTypes from "../Actions/ActionTypes";

interface InfoSnackBarProps {}

export default function InfoSnackBar(props: InfoSnackBarProps): ReactElement {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handler = (action: Action) => {
      if (action.actionType === ActionTypes.DISPLAY_MESSAGE) {
        setMessage(action.payload.message);
        setSnackbarOpen(true);
      }
    };

    const id = Dispatcher.register(handler);
    return () => Dispatcher.unregister(id);
  }, []);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={snackbarOpen}
      onClose={() => setSnackbarOpen(false)}
      autoHideDuration={3000}
      message={message}
    />
  );
}
