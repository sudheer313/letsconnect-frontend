import decode from "jwt-decode";
const saveToken = (token) => {
  localStorage.setItem("id_token", token);
};

const loggedIn = () => {
  const token = localStorage.getItem("id_token");
  return token ? true : false;
};

const logout = () => {
  localStorage.removeItem("id_token");
};

const getProfile = () => {
  return decode(localStorage.getItem("id_token"));
};

export { saveToken, loggedIn, logout, getProfile };
