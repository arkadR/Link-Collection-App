import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { updateCollection } from "../../Actions/Actions";
import { Collection } from "../../Model/Collection";
import CollectionsStore from "../../Stores/CollectionsStore";
import SimpleDialog from "./SimpleDialog";

type EditCollectionDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
};

export default function EditCollectionDialog(props: EditCollectionDialogProps) {
  const title = "Edit collection";
  const description = "Enter new name for this collection.";
  let [collection, setCollection] = useState<Collection | null>(null);
  const [inputText, setInputText] = React.useState("");

  useEffect(() => {
    setCollection(CollectionsStore.getCollection(props.collectionId));
    const changeHandler = () => {
      setCollection(CollectionsStore.getCollection(props.collectionId));
    };

    CollectionsStore.addChangeListener(changeHandler);
    return () => {
      CollectionsStore.removeChangeListener(changeHandler);
    };
  }, [props.collectionId]);

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
          placeholder={collection?.name}
          fullWidth
        />
      }
      actions={
        <Button
          disabled={inputText.length === 0 || inputText === collection?.name}
          onClick={() => {
            updateCollection(props.collectionId, inputText);
            props.toggleDialogOpen();
          }}
          color="primary"
          autoFocus
        >
          Save changes
        </Button>
      }
    />
  );
}
