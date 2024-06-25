import axios from "axios";
export interface Authed {
  firstname: string | null;
  lastname: string | null;
  username: string | null;
  role: string | null;
  token: string | null;
}
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
const isSessionTokenValid = (): boolean => {
  const token = getAuth();
  if (!token) {
    return false; // No token found, consider user as not logged in
  }

  try {
    if (token != null) {
      const { exp } = JSON.parse(atob(token.token.split(".")[1]));
      return exp * 1000 < Date.now();
    }
    // Check if expiration time is in the future
  } catch (error) {
    console.error("Error parsing or verifying token:", error);
    return false;
  }
};
export const deleteToken = () => {
  if (isSessionTokenValid()) {
    localStorage.removeItem("auth");
    return true;
  }
  return false;
};

export const getAuth = () => {
  const storage = localStorage.getItem("auth");
  const auth: Authed | null = storage != null ? JSON.parse(storage) : null;
  if (!auth) return false;

  const user = {
    user: auth.username,
    role: auth.role,
    token: auth.token,
  };

  return user;
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
export const registerUrl = "http://localhost:8080/auth/register";
export interface userRegister {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  token:string,
  role: string;
}
