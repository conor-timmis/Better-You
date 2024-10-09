import axios from "axios";
import Cookies from "js-cookie";

// Create Axios instances
export const axiosReq = axios.create({
  baseURL: "https://better-you-ec0aa381f182.herokuapp.com/",
  withCredentials: true,
});

export const axiosRes = axios.create();

// Set default headers
axiosReq.defaults.headers.post["Content-Type"] = "application/json";

// Add CSRF token to headers
axiosReq.interceptors.request.use(
  (config) => {
    const csrfToken = Cookies.get("csrftoken");
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Refresh token on 401 errors
axiosReq.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Refresh access token
        const refreshResponse = await axiosRes.post(
          '/dj-rest-auth/token/refresh/',
          null,
          {
            withCredentials: true,
          }
        );
        const newAccessToken = refreshResponse.data.access_token;

        // Store new token
        localStorage.setItem('accessToken', newAccessToken);

        // Retry original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosReq(originalRequest);
      } catch (refreshError) {
        // Redirect to sign-in on failure
        localStorage.removeItem('accessToken');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);