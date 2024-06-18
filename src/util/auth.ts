import axios from "axios";

export const createSession = (token: string) => {
  sessionStorage.setItem("auth", token);
};
export const getTokenFromSessionStorage = () => {
  return sessionStorage.getItem("auth");
};
export const decodeToken = (token: any) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payload = JSON.parse(atob(base64));
  return payload;
};

export const login = async (username: string, password: string) => {
  return await axios.post("http://localhost:8080/auth/authentication", {
    username,
    password,
  });
};
