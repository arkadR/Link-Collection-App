import React from "react";
import Message from "./Common/Message";
import ContentWithDrawer from "./ContentWithDrawer";
import Layout from "./Layout";

export default function Home() {
  return (
    <Layout>
      <ContentWithDrawer>
        <Message text="Select a collection to display" />
      </ContentWithDrawer>
    </Layout>
  );
}
