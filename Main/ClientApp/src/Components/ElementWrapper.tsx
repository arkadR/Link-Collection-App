import React from "react";
import { Element } from "../Model/Element";
import ElementView from "./ElementView";
import ImageElement from "./ImageElement";
import SpotifyElement from "./SpotifyElement";
import YoutubeElement from "./YoutubeElement";
import ElementTypeService from "../Service/ElementTypeService";
import { ElementType } from "../Model/ElementType";

type ElementWrapperProps = {
  element: Element;
};

export default function ElementWrapper(props: ElementWrapperProps) {
  const element = props.element;
  const elementType = ElementTypeService.getElementType(element);

  switch (elementType) {
    case ElementType.BASIC:
      return <ElementView element={element} />;
    case ElementType.IMAGE:
      return <ImageElement element={element} />;
    case ElementType.SPOTIFY:
      return <SpotifyElement element={element} />;
    case ElementType.YOUTUBE:
      return <YoutubeElement element={element} />;
  }
}
