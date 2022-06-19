const getToken = () => {
  return localStorage.getItem("token");
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const isLoggedIn = () => {
  return localStorage.getItem("token") ? true : false;
};
const TokenServices = {
  getToken,
  setToken,
  removeToken,
  isLoggedIn,
};
export default TokenServices;
