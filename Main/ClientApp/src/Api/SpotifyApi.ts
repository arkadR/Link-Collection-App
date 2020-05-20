const queueEndpoint = "https://api.spotify.com/v1/me/player/queue";

class SpotifyApi {
  async addToQueue(trackUri: string, userToken: string): Promise<Response> {
    let response = await fetch(`${queueEndpoint}?uri=${trackUri}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  }
}

let api = new SpotifyApi();
export default api;
