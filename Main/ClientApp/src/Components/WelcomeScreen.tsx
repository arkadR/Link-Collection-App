import React from "react";
import PanelWideMessage from "./Common/PanelWideMessage";
import Layout from "./Layout";

export default function WelcomeScreen() {
  return (
    <Layout>
      <PanelWideMessage text="Log in to get started" />
    </Layout>
  );
}
