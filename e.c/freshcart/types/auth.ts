export interface User {
  name: string;
  email: string;
  role?: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}

export interface LoginData {
  email: string;
  password: string;
}