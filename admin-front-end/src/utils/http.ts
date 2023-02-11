import axios from "axios";
import token from "./token";

const authURL = "http://localhost:3000/v1/api/auth/refresh-token";

axios.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + token.getAccessToken();
  return config;
});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401)
      axios.post(authURL, {
        refreshToken: token.getRefreshToken(),
      });
  }
);
