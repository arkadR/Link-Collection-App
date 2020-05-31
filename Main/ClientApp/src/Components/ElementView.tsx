import React, { ReactNode, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Menu,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import { Element as ElementModel } from "../Model/Element";
import { IconButton } from "@material-ui/core";
import { MoreVert, Delete, Edit } from "@material-ui/icons";
import {
  GetHostnameLink,
  GetProperUrl,
  OpenInNewTab,
} from "../Infrastructure/UrlUtilities";
import EditElementDialog from "../Components/Dialogs/EditElementDialog";
import DeleteElementDialog from "../Components/Dialogs/DeleteElementDialog";
import { parse } from "tldts";
import ActionTypes from "../Actions/ActionTypes";
import Action from "../Infrastructure/Action";
import Dispatcher from "../Infrastructure/Dispatcher";
import { getFaviconUrl } from "../Actions/FaviconActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "10px",
      cursor: "pointer",
      background: "rgba(34, 35, 78, 0.05)",
    },
    icon: {
      zoom: 2,
      maxHeight: "20px",
      maxWidth: "20px",
    },
  })
);

type ElementViewProps = {
  element: ElementModel;
  children?: ReactNode;
};

export default function ElementView(props: ElementViewProps) {
  const classes = useStyles();

  const [elementUrl, setElementUrl] = useState("");
  const [displayedName, setDisplayedName] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("_");
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const onMenuOpen = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget as Element);
  };
  const onMenuClose = () => setAnchorEl(null);

  useEffect(() => {
    let url = props.element.link;
    let name = props.element.name;
    setElementUrl(GetProperUrl(url));
    setDisplayedName(name.length === 0 ? url : name);
    setFaviconUrl(GetHostnameLink(url) + "/favicon.ico");
    let hostname = parse(url).hostname;

    const faviconHandler = (action: Action) => {
      if (
        action.actionType === ActionTypes.GET_FAVICON &&
        action.payload.domain === hostname
      ) {
        setFaviconUrl(action.payload.iconUrl);
      }
    };

    const id = Dispatcher.register(faviconHandler);

    if (hostname !== null) getFaviconUrl(hostname);

    return () => Dispatcher.unregister(id);
  }, [props.element]);

  return (
    <>
      <Card
        className={classes.root}
        elevation={3}
        onClick={(ev) => OpenInNewTab(elementUrl)}
      >
        <CardHeader
          avatar={<Avatar alt={displayedName.toUpperCase()} src={faviconUrl} />}
          title={displayedName}
          subheader={elementUrl}
          action={
            <IconButton
              aria-label="settings"
              onClick={(e) => {
                e.stopPropagation();
                onMenuOpen(e);
              }}
            >
              <MoreVert />
            </IconButton>
          }
        />
        {props.children ? <CardContent>{props.children}</CardContent> : <></>}
      </Card>
      <Menu
        open={anchorEl !== null}
        anchorEl={anchorEl}
        onClose={onMenuClose}
        PaperProps={{
          style: {
            maxHeight: 350,
          },
        }}
      >
        <div>
          <ListItem onClick={() => setDeleteDialogOpen(true)} button>
            <ListItemIcon>
              <Delete />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItem>
          <ListItem onClick={() => setEditDialogOpen(true)} button>
            <ListItemIcon>
              <Edit />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </ListItem>
        </div>
      </Menu>
      <EditElementDialog
        open={editDialogOpen}
        toggleDialogOpen={() => setEditDialogOpen(!editDialogOpen)}
        element={props.element}
      />
      <DeleteElementDialog
        open={deleteDialogOpen}
        toggleDialogOpen={() => setDeleteDialogOpen(!deleteDialogOpen)}
        collectionId={props.element.collectionId}
        elementId={props.element.id}
      />
    </>
  );
}
