import "./App.css";
import React from "react";
import Layout from "./Components/Layout";
import { Route } from "react-router-dom";
import Home from "./Components/Home";
import { ApplicationPaths } from "./Authorization/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./Authorization/ApiAuthorizationRoutes";
import AuthorizeRoute from "./Authorization/AuthorizeRoute";
import ContentWithDrawer from "./Components/ContentWithDrawer";
import WelcomeScreen from "./Components/WelcomeScreen";
import CollectionsSite from "./Components/CollectionsSite";

function App() {
  return (
    <>
      <ApiAuthorizationRoutes />
      <Route exact path="/" component={WelcomeScreen} />
      <AuthorizeRoute path="/collections/" component={CollectionsSite} />
      {/* <Route
        path={ApplicationPaths.ApiAuthorizationPrefix}
        component={ContentWithDrawer}
      >

        <Layout>
          <ContentWithDrawer>
      </ContentWithDrawer>
      </Layout>
      </Route> */}
    </>
  );
}

export default App;
