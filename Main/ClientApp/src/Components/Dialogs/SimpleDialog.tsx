import React, { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { blue, red } from "@material-ui/core/colors";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const blueRedTheme = createMuiTheme({
  palette: { primary: blue, secondary: red },
});

type SimpleDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  title: string;
  description?: string;
  content?: ReactNode;
  actions?: ReactNode;
  additionalCancelAction?: () => void;
};

export default function SimpleDialog(props: SimpleDialogProps) {
  return (
    <Dialog open={props.open} onClose={props.toggleDialogOpen}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
        {props.content}
      </DialogContent>
      <DialogActions>
        <MuiThemeProvider theme={blueRedTheme}>
          <Button
            onClick={() => {
              props.additionalCancelAction !== undefined &&
                props.additionalCancelAction();
              props.toggleDialogOpen();
            }}
            color="primary"
          >
            Cancel
          </Button>
          {props.actions}
        </MuiThemeProvider>
      </DialogActions>
    </Dialog>
  );
}
