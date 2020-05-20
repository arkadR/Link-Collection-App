export const authEndpoint = "https://accounts.spotify.com/authorize";

class SpotifyApi {
  //     async getUserToken(clientId: string, redirectUri: string, scopes: string[]): Promise<boolean> {
  //         var response = await fetch(`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  //     "%20"
  //   )}&response_type=token&show_dialog=true`);
  //   return response.ok;
  //       }
}

let api = new SpotifyApi();
export default api;
