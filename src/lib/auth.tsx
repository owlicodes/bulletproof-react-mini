import { configureAuth } from "react-query-auth";
import { Navigate, useLocation } from "react-router-dom";
import { z } from "zod";

import { api } from "./api-client";
import { AuthResponse, User } from "@/types/api";

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async (): Promise<User> => {
  const response = await api.get("/v1/users/me");
  return response.data;
};

const logout = (): Promise<void> => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // return api.post("/v1/auth/logout"); you can also call a logout api if needed
  return new Promise((resolve) => resolve());
};

export const loginInputSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Password must be atleast 8 characters."),
});
export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = async (
  data: LoginInput,
): Promise<AuthResponse> => {
  const response = await api.post("/v1/auth/login", data);
  localStorage.setItem("accessToken", response.data.tokens.accessToken);
  localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
  return new Promise((resolve) => resolve(response.data));
};

export const registerInputSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Password must be atleast 8 characters."),
});
export type RegisterInput = z.infer<typeof registerInputSchema>;
const registerWithEmailAndPassword = async (
  data: RegisterInput,
): Promise<AuthResponse> => {
  const response = await api.post("/v1/auth/register", data);
  localStorage.setItem("accessToken", response.data.tokens.accessToken);
  localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
  return new Promise((resolve) => resolve(response.data));
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    return response.user;
  },
  registerFn: async (data: RegisterInput) => {
    const response = await registerWithEmailAndPassword(data);
    return response.user;
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } =
  configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return (
      <Navigate
        to={`/auth/login?redirectTo=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }

  return children;
};
