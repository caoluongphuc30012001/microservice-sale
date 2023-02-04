const login = (payload: Object) => {
  return {
    type: "login",
    payload: payload,
  };
};

export { login };
