import React from "react";
import { Element } from "../Model/Element";
import ElementView from "./ElementView";
import ImageElement from "./ImageElement";
import SpotifyElement from "./SpotifyElement";

type ElementWrapperProps = {
  element: Element;
};

export default function ElementWrapper(props: ElementWrapperProps) {
  return (
    <>
      {IsImageElement(props.element) ? (
        <ImageElement element={props.element} />
      ) : isSpotifyElement(props.element) ? (
        <SpotifyElement element={props.element} />
      ) : (
        <ElementView element={props.element} />
      )}
    </>
  );
}

const IsImageElement = (element: Element) => {
  return element.link.match(/\.(jpeg|jpg|gif|png)$/) != null;
};

const isSpotifyElement = (element: Element) => {
  return (
    //TODO:check
    element.link.match(
      /(https?:\/\/open.spotify.com\/(track|user|artist|album)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track|user|artist|album):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|))/

      // /(https?:\/\/open.spotify.com\/(track)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track):[a-zA-Z0-9])+(spotify:(track):[a-zA-Z0-9]))/
    ) != null
  );
};
