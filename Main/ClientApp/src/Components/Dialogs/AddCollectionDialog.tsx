import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";
import { addCollection } from "../../Actions/Actions";
import { CollectionCreationData } from "../../Model/Collection";

type AddCollectionDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
};

export default function AddCollectionDialog(props: AddCollectionDialogProps) {
  const [inputText, setInputText] = React.useState("");

  const handleInputChange = (newInput: string) => {
    setInputText(newInput);
  };

  const createCollectionData = (name: string) => {
    return { isPublic: false, name: name } as CollectionCreationData;
  };

  return (
    <Dialog open={props.open} onClose={props.toggleDialogOpen}>
      <DialogTitle>{"Add collection"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter name of a new category here. You can change later settings for
          this category.
        </DialogContentText>
        <TextField
          onChange={e => handleInputChange(e.target.value)}
          autoFocus
          margin="dense"
          id="collectionName"
          label="Collection name"
          type="email"
          placeholder="MyCollection"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.toggleDialogOpen} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            addCollection(createCollectionData(inputText));
            props.toggleDialogOpen();
          }}
          color="primary"
          autoFocus
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
