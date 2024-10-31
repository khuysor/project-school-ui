import axios from "axios";
import { Authed } from "../type/authType";
import { apiLogin } from "../api/backendRoute";

export const createSession = (auth: Authed) => {
  const authed: Authed = {
    username: auth.username,
    firstname: auth.firstname,
    lastname: auth.lastname,
    role: auth.role,
    token: auth.token,
  };
  const authedString = JSON.stringify(authed);
  localStorage.setItem("auth", authedString);
};

export const getAuth = () => {
  const storage = localStorage.getItem("auth");
  const auth: Authed | null = storage != null ? JSON.parse(storage) : null;
  if (!auth) return null;

  const user = {
    user: auth.username,
    role: auth.role,
    token: auth.token,
  };

  return user;
};
export const removeAuth = () => {
  localStorage.removeItem("auth");
};

export const decodeToken = (token: any) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const payload = JSON.parse(atob(base64));
  return payload;
};

export const login = async (username: string, password: string) => {
  return await axios.post(apiLogin, {
    username,
    password,
  });
};
