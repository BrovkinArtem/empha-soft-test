import Cookies from "js-cookie";

export const getAuthToken = () => {
  return Cookies.get("auth_token") || null;
};

export const setAuthToken = (token) => {
  Cookies.set("auth_token", token, {
    expires: 7,
    secure: window.location.protocol === "https:",
    sameSite: "strict",
  });
};

export const removeAuthToken = () => {
  Cookies.remove("auth_token");
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};
