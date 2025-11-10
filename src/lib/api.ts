const API_BASE_URL = import.meta.env.PROD
  ? "/api"
  : "http://localhost:3001/api";

// Generic API helper
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// Events API
export const eventsAPI = {
  getAll: () => apiRequest("/events"),
  getBySlug: (slug: string) => apiRequest(`/events/${slug}`),
  create: (data: any) =>
    apiRequest("/events", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    apiRequest(`/events/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) => apiRequest(`/events/${id}`, { method: "DELETE" }),
};

// Musicians API
export const musiciansAPI = {
  getAll: () => apiRequest("/musicians"),
  create: (data: any) =>
    apiRequest("/musicians", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: any) =>
    apiRequest(`/musicians/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  delete: (id: string) => apiRequest(`/musicians/${id}`, { method: "DELETE" }),
};
