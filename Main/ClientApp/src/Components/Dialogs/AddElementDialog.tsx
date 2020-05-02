import React from "react";
import { Button, TextField } from "@material-ui/core";
import SimpleDialog from "./SimpleDialog";
import { addElement } from "../../Actions/ElementActions";
import { ElementCreationData } from "../../Model/Element";

type AddElementDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
};

export default function AddElementDialog(props: AddElementDialogProps) {
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");

  const handleNameChange = (newName: string) => {
    setName(newName);
  };

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
  };

  const createElementData = (name: string, url: string) => {
    return {
      collectionId: props.collectionId,
      name: name,
      link: url,
    } as ElementCreationData;
  };

  return (
    <SimpleDialog
      open={props.open}
      toggleDialogOpen={props.toggleDialogOpen}
      title="Add Element"
      description="Enter name and url address of a new element here. You can change later settings for this element."
      content={
        <>
          <TextField
            onChange={(e) => handleNameChange(e.target.value)}
            autoFocus
            margin="dense"
            id="elementName"
            label="Element name"
            type="email"
            placeholder="MyElement"
            fullWidth
          />
          <TextField
            onChange={(e) => handleUrlChange(e.target.value)}
            autoFocus
            margin="dense"
            id="elementDescription"
            label="Url"
            type="email"
            placeholder="Link to MyElement"
            fullWidth
          />
        </>
      }
      actions={
        <Button
          disabled={url.length === 0}
          onClick={() => {
            addElement(createElementData(name, url));
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
