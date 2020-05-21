import SpotifyWebApi from "spotify-web-api-js";

const queueEndpoint = "https://api.spotify.com/v1/me/player/queue";

var spotifyApi = new SpotifyWebApi();

class SpotifyApi {
  async addToQueue(trackUri: string, userToken: string): Promise<Response> {
    let response = await fetch(
      `${queueEndpoint}?uri=${encodeURIComponent(trackUri)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }

  async getTrackInfo(
    trackId: string,
    userToken: string
  ): Promise<SpotifyApi.SingleTrackResponse> {
    spotifyApi.setAccessToken(userToken);
    let track = await spotifyApi.getTrack(trackId);
    return track;
  }
}

let api = new SpotifyApi();
export default api;
