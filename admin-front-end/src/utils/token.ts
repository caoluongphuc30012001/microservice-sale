class Token {
  setAccessToken(accessToken: string) {
    if (typeof window !== "undefined")
      window.localStorage.setItem("accessToken", accessToken);
  }

  setRefreshToken(refreshToken: string) {
    if (typeof window !== "undefined")
      window.localStorage.setItem("refreshToken", refreshToken);
  }

  getAccessToken() {
    if (typeof window !== "undefined")
      return window.localStorage.getItem("accessToken");
  }

  getRefreshToken() {
    if (typeof window !== "undefined")
      return window.localStorage.getItem("refreshToken");
  }
}

const token = new Token();
export default token;
