import axios, { AxiosError, AxiosRequestConfig } from "axios";
import token from "./token";

const authURL = "http://localhost:3000/v1/api/auth/refresh-token";

const refreshToken = async (error: AxiosError) => {
  try {
    const result = await axios.post(authURL, {
      refreshToken: token.getRefreshToken(),
    });
    if (result.data.code == 201) {
      return result;
    } else {
      token.setAccessToken(result.data.data.accessToken);
      token.setRefreshToken(result.data.data.refreshToken);
      return await axios(error.config as AxiosRequestConfig);
    }
  } catch (error) {
    await Promise.reject(error);
  }
};

axios.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer " + token.getAccessToken();
  return config;
});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status == 401) return await refreshToken(error);
    else return await Promise.reject(error);
  }
);
