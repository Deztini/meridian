export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupResponse {
  success: boolean;
  message: boolean;
}