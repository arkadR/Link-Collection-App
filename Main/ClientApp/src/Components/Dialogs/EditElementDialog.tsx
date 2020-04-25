import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { updateElement } from "../../Actions/Actions";
import { Element, ElementUpdateData } from "../../Model/Element";
import CollectionsStore from "../../Stores/CollectionsStore";
import SimpleDialog from "./SimpleDialog";

type EditElementDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
  elementId: number;
};

export default function EditElementDialog(props: EditElementDialogProps) {
  const title = "Edit element";
  const description = "Enter new name for this element.";
  let [element, setElement] = useState<Element | null>(null);
  //TODO: input for link editing
  const [inputText, setInputText] = React.useState("");

  const createElementUpdateData = () => {
    return {
      name: inputText,
    } as ElementUpdateData;
  };

  useEffect(() => {
    let collection = CollectionsStore.getCollection(props.collectionId);
    setElement(
      collection?.elements.find((el) => el.id === props.elementId) ?? null
    );
  }, [props.collectionId, props.elementId]);

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
          id="elementName"
          label="Element name"
          type="email"
          placeholder={element?.name}
          fullWidth
        />
      }
      actions={
        <Button
          disabled={inputText.length === 0 || inputText === element?.name}
          onClick={() => {
            updateElement(
              props.collectionId,
              props.elementId,
              createElementUpdateData()
            );
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
