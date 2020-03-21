import React, { ReactNode } from "react";
import AppBar from "./AppBar";
import ContentWithDrawer from "./ContentWithDrawer";

function Layout(props: LayoutPropTypes) {
  return (
    <div>
      <AppBar />
      <ContentWithDrawer>{props.children}</ContentWithDrawer>
    </div>
  );
}

type LayoutPropTypes = {
  children: ReactNode;
};

export default Layout;
