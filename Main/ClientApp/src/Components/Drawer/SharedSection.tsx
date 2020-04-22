import React, { useState, useEffect } from "react";
import DrawerItem from "./DrawerItem";
import { People, Edit, Visibility, VisibilityOff } from "@material-ui/icons";
import { List } from "@material-ui/core";
import SharedCollectionsStore from "../../Stores/SharedCollectionsStore";
import DrawerItemNested from "./DrawerItemNested";

export default function SharedSection() {
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
          {sharedCollections.map((sharedCollection) => (
            <DrawerItemNested
              title={sharedCollection.collection.name}
              link={`/collections/shared/${sharedCollection.collection.id}`}
              key={sharedCollection.collection.id}
              icon={
                sharedCollection.editRights ? (
                  <Edit />
                ) : sharedCollection.viewRights ? (
                  <Visibility />
                ) : (
                  <VisibilityOff />
                )
              }
              // menuItems={<></>}
            />
          ))}
        </List>
      }
    />
  );
}
