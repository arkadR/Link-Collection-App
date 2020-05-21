import React, { useState, useEffect } from "react";
import UsersStore from "../Stores/UsersStore";
import { Redirect } from "react-router-dom";
import { GetQueryParams } from "../Infrastructure/UrlUtilities";
import Cookies from "js-cookie";
import { SpotifyTokenCookie } from "../Model/Spotify";

export default function SpotifyCallbackPage() {
  const [currentUser, setCurrentUser] = useState(UsersStore.getCurrentUser());
  const hash = window.location.hash;
  let params = GetQueryParams(hash);

  useEffect(() => {
    const handler = () => {
      setCurrentUser(UsersStore.getCurrentUser());
    };
    UsersStore.addChangeListener(handler);
    return () => UsersStore.removeChangeListener(handler);
  }, []);

  let collectionId = Cookies.getJSON("spotifyRedirectCollectionId") as
    | number
    | null;

  if (currentUser !== null) {
    Cookies.set(
      "spotifyUserToken",
      JSON.stringify(
        getSpotifyTokenCookie(params.get("access_token"), currentUser.id)
      )
    );
    Cookies.remove("spotifyRedirectCollectionId");
  }

  return (
    <>
      {currentUser !== null && <Redirect to={"/collections/" + collectionId} />}
    </>
  );
}

function getSpotifyTokenCookie(access_token: string, userId: string) {
  return {
    spotifyToken: access_token,
    userId: userId,
  } as SpotifyTokenCookie;
}
