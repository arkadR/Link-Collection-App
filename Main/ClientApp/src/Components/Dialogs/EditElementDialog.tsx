import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { updateElement } from "../../Actions/Actions";
import { Element, ElementUpdateData } from "../../Model/Element";
import SimpleDialog from "./SimpleDialog";

type EditElementDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  element: Element;
};

export default function EditElementDialog(props: EditElementDialogProps) {
  const title = "Edit element";
  const description = "Change the name or link of this element.";
  let [element, setElement] = useState<Element>(props.element);
  const [inputName, setInputName] = React.useState(props.element.name);
  const [inputUrl, setInputUrl] = React.useState(props.element.link);

  const createElementUpdateData = () => {
    return {
      name: inputName.length === 0 ? element?.name : inputName,
      link: inputUrl.length === 0 ? element?.link : inputUrl,
    } as ElementUpdateData;
  };

  useEffect(() => {
    setElement(props.element);
    setInputName(props.element.name);
    setInputUrl(props.element.link);
  }, [props.element]);

  const handleInputNameChange = (newInput: string) => {
    setInputName(newInput);
  };

  const handleInputUrlChange = (newInput: string) => {
    setInputUrl(newInput);
  };

  const saveChangesEnabled =
    (inputName.length !== 0 && inputName !== element.name) ||
    (inputUrl.length !== 0 && inputUrl !== element.link);

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title={title}
      description={description}
      content={
        <>
          <TextField
            defaultValue={element.name}
            onChange={(e) => handleInputNameChange(e.target.value)}
            autoFocus
            margin="dense"
            id="elementName"
            label="Element name"
            type="email"
            placeholder={element.name}
            fullWidth
          />
          <TextField
            defaultValue={element.link}
            onChange={(e) => handleInputUrlChange(e.target.value)}
            margin="dense"
            id="elementUrl"
            label="Url"
            type="email"
            placeholder={element.link}
            fullWidth
          />
        </>
      }
      actions={
        <Button
          disabled={!saveChangesEnabled}
          onClick={() => {
            updateElement(
              props.element.collectionId,
              props.element.id,
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
