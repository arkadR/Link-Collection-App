import authService from "../Authorization/AuthorizeService";

export async function authorizedGet(apiEndpoint: string) {
  const host = window.location.origin;
  const token = await authService.getAccessToken();
  return await fetch(`${host}/${apiEndpoint}`, {
    headers: !token ? {} : { Authorization: `Bearer ${token}` },
  });
}

export async function authorizedPost(apiEndpoint: string, data = {}) {
  return authorizedGenericFetch(apiEndpoint, data, "POST");
}

export async function authorizedDelete(apiEndpoint: string, data = {}) {
  return authorizedGenericFetch(apiEndpoint, data, "DELETE");
}

export async function authorizedUpdate(apiEndpoint: string, data = {}) {
  return authorizedGenericFetch(apiEndpoint, data, "PUT");
}

async function authorizedGenericFetch(
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
