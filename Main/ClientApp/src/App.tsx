import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import ApiAuthorizationRoutes from "./Authorization/ApiAuthorizationRoutes";
import AuthorizeRoute from "./Authorization/AuthorizeRoute";
import WelcomeScreen from "./Components/WelcomeScreen";
import CollectionsSite from "./Components/CollectionsSite";

function App() {
  return (
    <>
      <ApiAuthorizationRoutes />
      <Route exact path="/" component={WelcomeScreen} />
      <AuthorizeRoute path="/collections/" component={CollectionsSite} />
    </>
  );
}

export default App;
