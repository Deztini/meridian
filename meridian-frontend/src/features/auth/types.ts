export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  message: boolean;
}