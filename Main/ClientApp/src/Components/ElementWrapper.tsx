import React from "react";
import { Element } from "../Model/Element";
import ElementView from "./ElementView";
import ImageElement from "./ImageElement";
import YoutubeElement from "./YoutubeElement";

type ElementWrapperProps = {
  element: Element;
};

export default function ElementWrapper(props: ElementWrapperProps) {
  //TODO: better switch case
  return (
    <>
      {IsImageElement(props.element) ? (
        <ImageElement element={props.element} />
      ) : IsYoutubeLink(props.element) ? (
        <YoutubeElement element={props.element} />
      ) : (
        <ElementView element={props.element} />
      )}
    </>
  );
}

const IsImageElement = (element: Element) => {
  return element.link.match(/\.(jpeg|jpg|gif|png)$/) != null;
};

const IsYoutubeLink = (element: Element) => {
  //TODO: Regex
  return element.link.startsWith("https://youtube.com/watch");
};
