import React from "react";
import { Button, TextField } from "@material-ui/core";
import { updateCollection } from "../../Actions/Actions";
import SimpleDialog from "./SimpleDialog";

type EditCollectionDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
};

export default function EditCollectionDialog(props: EditCollectionDialogProps) {
  const title = "Edit collection";
  const description = "Enter new name for this collection.";
  const [inputText, setInputText] = React.useState("");

  const handleInputChange = (newInput: string) => {
    setInputText(newInput);
  };

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      content={
        <TextField
          onChange={(e) => handleInputChange(e.target.value)}
          autoFocus
          margin="dense"
          id="collectionName"
          label="Collection name"
          type="email"
          placeholder="MyCollection"
          fullWidth
        />
      }
      actions={
        <Button
          disabled={inputText.length === 0}
          onClick={() => {
            updateCollection(props.collectionId, inputText);
            props.toggleDialogOpen();
          }}
          color="primary"
          autoFocus
        >
          Edit
        </Button>
      }
    />
  );
}
