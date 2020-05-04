import React, { useState, useEffect } from "react";
import SimpleDialog from "./SimpleDialog";
import {
  Button,
  makeStyles,
  Theme,
  createStyles,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import CollectionsApi from "../../Api/CollectionsApi";
import CollectionsStore from "../../Stores/CollectionsStore";

type MakePublicDialogProps = {
  open: boolean;
  toggleDialogOpen: () => void;
  collectionId: number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBlockEnd: "10px",
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative",
    },
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

export default function MakePublicDialog(props: MakePublicDialogProps) {
  const classes = useStyles();
  const title = "Get sharable link";
  const description = `You can make this collection publicly available, so anyone with the link will be able to view the contents. 
  Do you want to proceed?`;
  const successDescription =
    "Collection is now public! You can now share it with everyone using the link below.";

  const [loading, setLoading] = React.useState(false);
  const [sharableLink, setSharableLink] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const onConfirmClick = async () => {
    setLoading(true);
    let ok = await CollectionsApi.makePublic(props.collectionId);
    debugger;
    if (ok) {
      setSharableLink(
        `https://${window.location.host}/public/${props.collectionId}`
      );
    } else {
      //TODO
    }
    setLoading(false);
  };

  useEffect(() => {
    let collection = CollectionsStore.getCollection(props.collectionId);
    if (collection?.isPublic === true)
      setSharableLink(
        `https://${window.location.host}/public/${props.collectionId}`
      );
    else setSharableLink("");
  }, [props.collectionId]);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(sharableLink);
    setSnackbarOpen(true);
  };

  return (
    <>
      <SimpleDialog
        open={props.open}
        toggleDialogOpen={props.toggleDialogOpen}
        title={title}
        description={sharableLink === "" ? description : successDescription}
        content={
          <>
            {sharableLink}
            {sharableLink !== "" && (
              <Button color="primary" onClick={copyToClipboard}>
                Copy
              </Button>
            )}
          </>
        }
        actions={
          <div className={classes.wrapper}>
            {sharableLink === "" && (
              <Button
                color="primary"
                disabled={loading}
                onClick={onConfirmClick}
              >
                Confirm
              </Button>
            )}
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        }
      ></SimpleDialog>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        autoHideDuration={3000}
        message="Link copied to clipboard"
      />
    </>
  );
}
