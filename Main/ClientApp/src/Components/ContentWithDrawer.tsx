import React, { ReactNode } from "react";
import Drawer from "./Drawer";

function ContentWithDrawer(props: ContentWithDrawerProps) {
  return (
    <div>
      <Drawer></Drawer>
      <div style={{ position: "absolute", top: "500px", left: "500px" }}>
        {props.children}
      </div>
    </div>
  );
}

type ContentWithDrawerProps = {
  children: ReactNode;
};

export default ContentWithDrawer;
