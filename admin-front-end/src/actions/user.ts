const login = (payload: Object) => {
  return {
    type: "login",
    payload: payload,
  };
};

const logout = (payload: Object) => {
  return {
    type: "logout",
    payload: payload,
  };
};

export { login, logout };
