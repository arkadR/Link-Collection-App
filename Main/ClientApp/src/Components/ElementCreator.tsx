import React from "react";
import { Element } from "../Model/Element";
import ElementView from "./ElementView";
import ImageElement from "./ImageElement";

type ElementCreatorProps = {
  element: Element;
};

export default function ElementCreator(props: ElementCreatorProps) {
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
