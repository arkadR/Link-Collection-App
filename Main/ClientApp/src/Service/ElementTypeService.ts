import { Element } from "../Model/Element";
import { ElementType } from "../Model/ElementType";

class ElementTypeService {
  getElementType(element: Element): ElementType {
    if (this.isImageElement(element)) return ElementType.IMAGE;
    if (this.isYoutubeElement(element)) return ElementType.YOUTUBE;
    if (this.isSpotifyElement(element)) return ElementType.SPOTIFY;
    return ElementType.BASIC;
  }

  isImageElement = (element: Element) => {
    return element.link.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  isSpotifyElement = (element: Element) => {
    return (
      //TODO:check
      element.link.match(
        /(https?:\/\/open.spotify.com\/(track)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|))/

        // /(https?:\/\/open.spotify.com\/(track|user|artist|album)\/[a-zA-Z0-9]+(\/playlist\/[a-zA-Z0-9]+|)|spotify:(track|user|artist|album):[a-zA-Z0-9]+(:playlist:[a-zA-Z0-9]+|))/
      ) != null
    );
  };

  isYoutubeElement = (element: Element) => {
    return element.link.match(/(youtube.)(\w)+(\/watch?)\?(v=)/) != null;
  };
}

const service = new ElementTypeService();
export default service;
