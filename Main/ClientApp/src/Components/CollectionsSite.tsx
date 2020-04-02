import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import ContentWithDrawer from "./ContentWithDrawer";
import { Route, useRouteMatch, RouteComponentProps } from "react-router-dom";
import PanelWideMessage from "./Common/PanelWideMessage";
import CollectionView from "./CollectionView";

export default function CollectionsSite(props: CollectionsSiteProps) {
  let { path, url } = useRouteMatch();
  return (
    <Layout>
      <ContentWithDrawer>
        <Route
          exact
          path={path}
          component={() => (
            <PanelWideMessage
              text="Select a collection to display"
              throbber={false}
            />
          )}
        />
        <Route path={`${url}/:collectionId`} component={CollectionView} />
      </ContentWithDrawer>
    </Layout>
  );
}

type CollectionsSiteProps = {};
