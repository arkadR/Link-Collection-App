import authService from "../Authorization/AuthorizeService";

export async function authorizedGet(apiEndpoint: string) {
  const host = window.location.origin;
  const token = await authService.getAccessToken();
  return await fetch(`${host}/${apiEndpoint}`, {
    headers: !token ? {} : { Authorization: `Bearer ${token}` },
  });
}

export async function unauthorizedGet(apiEndpoint: string) {
  const host = window.location.origin;
  return await fetch(`${host}/${apiEndpoint}`);
}

export async function authorizedPost(apiEndpoint: string, data = {}) {
  return authorizedRequest(apiEndpoint, data, "POST");
}

export async function authorizedDelete(apiEndpoint: string, data = {}) {
  return authorizedRequest(apiEndpoint, data, "DELETE");
}

export async function authorizedPatch(apiEndpoint: string, data = {}) {
  return authorizedRequest(apiEndpoint, data, "PATCH");
}

async function authorizedRequest(
  apiEndpoint: string,
  data = {},
  method: string
) {
  const host = window.location.origin;
  const token = await authService.getAccessToken();
  return fetch(`${host}/${apiEndpoint}`, {
    method: method,
    credentials: "same-origin",
    headers: !token
      ? {
          "Content-Type": "application/json",
        }
      : {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },

    body: JSON.stringify(data),
  });
}
