import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DrawerItem from "./DrawerItem";
import { People, Edit, Visibility, VisibilityOff } from "@material-ui/icons";
import { List } from "@material-ui/core";
import SharedCollectionsStore from "../../Stores/SharedCollectionsStore";
import DrawerItemNested from "./DrawerItemNested";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      color: "black",
      textDecoration: "none"
    }
  })
);

export default function SharedSection() {
  const classes = useStyles();
  const [sharedCollections, setSharedCollections] = useState(
    SharedCollectionsStore.getSharedCollections()
  );

  useEffect(() => {
    const changeHandler = () => {
      setSharedCollections(SharedCollectionsStore.getSharedCollections());
    };
    SharedCollectionsStore.addChangeListener(changeHandler);

    return () => {
      SharedCollectionsStore.removeChangeListener(changeHandler);
    };
  });

  return (
    <DrawerItem
      title="Shared with me"
      icon={<People />}
      nestedList={
        <List component="div" disablePadding>
          {sharedCollections.map(sharedCollection => (
            <Link
              to={`/collections/shared/${sharedCollection.collection.id}`}
              className={classes.link}
            >
              <DrawerItemNested
                title={sharedCollection.collection.name}
                icon={
                  sharedCollection.editRights ? (
                    <Edit />
                  ) : sharedCollection.viewRights ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )
                }
              />
            </Link>
          ))}
        </List>
      }
    />
  );
}
