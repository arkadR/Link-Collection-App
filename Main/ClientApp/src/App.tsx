import "./App.css";
import React from "react";
import Layout from "./Components/Layout";
import { Route } from "react-router-dom";
import Home from "./Components/Home";
import { ApplicationPaths } from "./api-authorization/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./api-authorization/ApiAuthorizationRoutes";
import AuthorizeRoute from "./api-authorization/AuthorizeRoute";

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
