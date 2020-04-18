import React from "react";
import { Element } from "../Model/Element";
import ElementView from "./ElementView";
import ImageElement from "./ImageElement";

type ElementWrapperProps = {
  element: Element;
};

export default function ElementWrapper(props: ElementWrapperProps) {
  return (
    <>
      {IsImageElement(props.element) ? (
        <ImageElement element={props.element} />
      ) : (
        <ElementView element={props.element} />
      )}
    </>
  );
}

const IsImageElement = (element: Element) => {
  return element.link.match(/\.(jpeg|jpg|gif|png)$/) != null;
};
