import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import ApiAuthorizationRoutes from "./Authorization/ApiAuthorizationRoutes";
import AuthorizeRoute from "./Authorization/AuthorizeRoute";
import WelcomeScreen from "./Components/WelcomeScreen";
import CollectionsPage from "./Components/CollectionsPage";
import PublicCollectionPage from "./Components/PublicCollectionPage";

function App() {
  return (
    <>
      <ApiAuthorizationRoutes />
      <Route exact path="/" component={WelcomeScreen} />
      <AuthorizeRoute path="/collections/" component={CollectionsPage} />
      <Route path="/public/" component={PublicCollectionPage} />
    </>
  );
}

export default App;
