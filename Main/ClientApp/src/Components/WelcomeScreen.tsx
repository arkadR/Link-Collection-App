import React from "react";
import Message from "./Common/Message";
import Layout from "./Layout";

export default function WelcomeScreen() {
  return (
    <Layout>
      <Message text="Log in to get started" />
    </Layout>
  );
}
