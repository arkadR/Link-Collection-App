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
  const [inputName, setInputName] = React.useState("");
  const [inputUrl, setInputUrl] = React.useState("");

  const createElementUpdateData = () => {
    return {
      name: inputName.length === 0 ? element?.name : inputName,
      link: inputUrl.length === 0 ? element?.link : inputUrl,
    } as ElementUpdateData;
  };

  useEffect(() => {
    let collection = CollectionsStore.getCollection(props.collectionId);
    setElement(
      collection?.elements.find((el) => el.id === props.elementId) ?? null
    );
  }, [props.collectionId, props.elementId]);

  const handleInputNameChange = (newInput: string) => {
    setInputName(newInput);
  };

  const handleInputUrlChange = (newInput: string) => {
    setInputUrl(newInput);
  };

  const saveChangesEnabled =
    (inputName.length !== 0 && inputName !== element?.name) ||
    (inputUrl.length !== 0 && inputUrl !== element?.link);

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      content={
        <>
          <TextField
            onChange={(e) => handleInputNameChange(e.target.value)}
            autoFocus
            margin="dense"
            id="elementName"
            label="Element name"
            type="email"
            placeholder={element?.name}
            fullWidth
          />
          <TextField
            onChange={(e) => handleInputUrlChange(e.target.value)}
            autoFocus
            margin="dense"
            id="elementUrl"
            label="Url"
            type="email"
            placeholder={element?.link}
            fullWidth
          />
        </>
      }
      actions={
        <Button
          disabled={!saveChangesEnabled}
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
