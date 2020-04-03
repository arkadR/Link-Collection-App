import authService from "../Authorization/AuthorizeService";

export async function authorizedGet(apiEndpoint: string) {
  const host = window.location.origin;
  const token = await authService.getAccessToken();
  return await fetch(`${host}/${apiEndpoint}`, {
    headers: !token ? {} : { Authorization: `Bearer ${token}` }
  });
}

export async function authorizedPost(apiEndpoint: string, data = {}) {
  const host = window.location.origin;
  const token = await authService.getAccessToken();
  return fetch(`${host}/${apiEndpoint}`, {
    method: "POST",
    credentials: "same-origin",
    headers: !token
      ? {
          "Content-Type": "application/json"
        }
      : {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },

    body: JSON.stringify(data)
  });
}
