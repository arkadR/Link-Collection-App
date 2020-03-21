import "./App.css";
import React from "react";
import Layout from "./Components/Layout";
import { Route } from "react-router-dom";
import Home from "./Components/Home";
import { ApplicationPaths } from "./Authorization/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./Authorization/ApiAuthorizationRoutes";
import AuthorizeRoute from "./Authorization/AuthorizeRoute";

function App() {
  return (
    <Layout>
      <Route exact path="/" component={Home}></Route>
      <Route
        path={ApplicationPaths.ApiAuthorizationPrefix}
        component={ApiAuthorizationRoutes}
      />
    </Layout>
  );
}

export default App;
