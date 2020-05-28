import React, { useState, useEffect } from "react";
import PanelWideMessage from "./Common/PanelWideMessage";
import Layout from "./Layout";
import authService from "../Authorization/AuthorizeService";
import { Redirect } from "react-router-dom";

export default function WelcomeScreen() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function populateState() {
      setIsAuthenticated(await authService.isAuthenticated());
    }
    populateState();
    const subscription = authService.subscribe(() => populateState());

    return () => {
      authService.unsubscribe(subscription);
    };
  }, []);

  return (
    <Layout>
      {isAuthenticated === true ? (
        <Redirect to={"/collections"} />
      ) : (
        <PanelWideMessage text="Log in to get started" />
      )}
    </Layout>
  );
}
