import api from "@/lib/api";
import { AuthResponse, LoginData, RegisterData } from "@/types/auth";

export const registerUser = async (data: RegisterData) =>
  (await api.post<AuthResponse>("/auth/signup", data)).data;

export const loginUser = async (data: LoginData) =>
  (await api.post<AuthResponse>("/auth/signin", data)).data;

export const forgotPassword = async (email: string) =>
  (await api.post("/auth/forgotPasswords", { email })).data;

export const verifyResetCode = async (resetCode: string) =>
  (await api.post("/auth/verifyResetCode", { resetCode })).data;

export const resetPassword = async (email: string, newPassword: string) =>
  (await api.put("/auth/resetPassword", { email, newPassword })).data;

export const changePassword = async (data: {
  currentPassword: string;
  password: string;
  rePassword: string;
}) => (await api.put("/users/changeMyPassword", data)).data;