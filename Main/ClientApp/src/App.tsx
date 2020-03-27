import "./App.css";
import React from "react";
import Layout from "./Components/Layout";
import { Route } from "react-router-dom";
import Home from "./Components/Home";
import { ApplicationPaths } from "./Authorization/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./Authorization/ApiAuthorizationRoutes";
import AuthorizeRoute from "./Authorization/AuthorizeRoute";
import ContentWithDrawer from "./Components/ContentWithDrawer";

function App() {
  return (
    <>
      <Route exact path="/">
        <Layout>
          <Home />
        </Layout>
      </Route>
      <Route
        path={ApplicationPaths.ApiAuthorizationPrefix}
        component={ContentWithDrawer}
      >
        <Layout>
          <ContentWithDrawer>
            <ApiAuthorizationRoutes />
          </ContentWithDrawer>
        </Layout>
      </Route>
      <AuthorizeRoute
        path="/"
        component={
          <Layout>
            <ContentWithDrawer>
              <Home />
            </ContentWithDrawer>
          </Layout>
        }
      ></AuthorizeRoute>
    </>
  );
}

export default App;
