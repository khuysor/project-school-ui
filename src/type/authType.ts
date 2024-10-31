export interface Authed {
  firstname: string | null;
  lastname: string | null;
  username: string | null;
  role: string | null;
  token: string | null;
}
export interface UserRegister {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  token: string;
  role: string;
}
