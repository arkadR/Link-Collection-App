class FaviconsApi {
  async getFaviconUrl(domain: string): Promise<Response> {
    let response = await fetch(
      `https://favicongrabber.com/api/grab/${domain}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }
}

let api = new FaviconsApi();
export default api;
