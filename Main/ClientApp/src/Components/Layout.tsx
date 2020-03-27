import React, { ReactNode } from "react";
import AppBar from "./Common/AppBar";
import { LoginMenu } from "../Authorization/LoginMenu";

type LayoutPropTypes = {
  children: ReactNode;
};

export default function Layout(props: LayoutPropTypes) {
  return (
    <div>
      <AppBar title={"Link App"} rightSideMenu={<LoginMenu />}></AppBar>
      {props.children}
    </div>
  );
}
