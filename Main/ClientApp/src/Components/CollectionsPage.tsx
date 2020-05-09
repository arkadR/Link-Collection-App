import React from "react";
import Layout from "./Layout";
import ContentWithDrawer from "./ContentWithDrawer";
import { Route, useRouteMatch } from "react-router-dom";
import PanelWideMessage from "./Common/PanelWideMessage";
import CollectionView from "./CollectionView";
import SharedCollectionView from "./SharedCollectionView";
import CollectionStatsView from "./CollectionStatsView";

export default function CollectionsPage(props: CollectionsSiteProps) {
  let { path, url } = useRouteMatch();
  return (
    <Layout>
      <ContentWithDrawer>
        <Route
          exact
          path={path}
          component={() => (
            <PanelWideMessage text="Select a collection to display" />
          )}
        />
        <Route
          path={`${url}/shared/:collectionId`}
          component={SharedCollectionView}
        />
        <Route exact path={`${url}/:collectionId`} component={CollectionView} />
        <Route
          exact
          path={`${url}/:collectionId/stats`}
          component={CollectionStatsView}
        />
      </ContentWithDrawer>
    </Layout>
  );
}

type CollectionsSiteProps = {};
