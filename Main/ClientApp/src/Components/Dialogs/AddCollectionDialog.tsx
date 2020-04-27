import React from "react";
import { Button, TextField } from "@material-ui/core";
import { CollectionCreationData } from "../../Model/Collection";
import SimpleDialog from "./SimpleDialog";
import { addCollection } from "../../Actions/CollectionActions";

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
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title="Add Collection"
      description="  Enter name of a new category here. You can change later settings for
    this category."
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
            addCollection(createCollectionData(inputText));
            props.toggleDialogOpen();
          }}
          color="primary"
          autoFocus
        >
          Add
        </Button>
      }
    />
  );
}
