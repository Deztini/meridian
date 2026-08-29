export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyPayload {
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface SignupResponse {
  success: boolean;
  message: boolean;
}

export interface VerifyResponse {
  success: boolean;
  message: boolean;
  data: {
    user: {
      id: string;
      email: string;
      fullName: string;
    };
  };
}

export interface ResendOtpResponse {
  success: boolean;
  message: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: boolean;
  data: {
    accessToken: string;
    user: {
      id: string;
      email: string;
      fullName: string;
    };
  };
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: boolean;
}
