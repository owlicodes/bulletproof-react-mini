import { configureAuth } from "react-query-auth";
import { Navigate, useLocation } from "react-router-dom";
import { z } from "zod";

import { api } from "./api-client";
import { AuthResponse, User } from "@/types/api";

// api call definitions for auth (types, schemas, requests):
// these are not part of features as this is a module shared across features

const getUser = async (): Promise<User | null> => {
  // const response = await api.get("/auth/me");
  // return response.data;

  return null;
};

const logout = (): Promise<void> => {
  return api.post("/v1/auth/logout");
};

export const loginInputSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Password must be atleast 8 characters."),
});
export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = (data: LoginInput): Promise<AuthResponse> => {
  return api.post("/v1/auth/login", data);
};

export const registerInputSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Password must be atleast 8 characters."),
});
export type RegisterInput = z.infer<typeof registerInputSchema>;
const registerWithEmailAndPassword = (
  data: RegisterInput,
): Promise<AuthResponse> => {
  return api.post("/v1/auth/register", data);
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
