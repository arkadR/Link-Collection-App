import React from "react";
import { Route, useRouteMatch } from "react-router-dom";
import Layout from "./Layout";
import PublicCollectionView from "./PublicCollectionView";

export default function PublicCollectionPage() {
  let { url } = useRouteMatch();
  return (
    <Layout>
      <Route path={`${url}/:collectionId`} component={PublicCollectionView} />
    </Layout>
  );
}
