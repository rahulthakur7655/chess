export const API_BASE_URL = "http://localhost:4000/api";
export const SOCKET_URL = "http://localhost:4000";

export async function apiRequest(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.token
          ? { Authorization: `Bearer ${options.token}` }
          : {})
      },
      body: options.body ? JSON.stringify(options.body) : undefined
    });
  } catch {
    throw new Error(
      "Cannot reach the server. Start `npm run server`, then check MongoDB and your .env settings."
    );
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status >= 500) {
      throw new Error(
        data.message ||
          "Server error. Check the backend terminal for MongoDB or server startup problems."
      );
    }

    throw new Error(data.message || "Request failed.");
  }

  return data;
}
