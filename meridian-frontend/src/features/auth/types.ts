export type OtpFlow = "signup" | "reset-password";

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

export interface ResetPasswordPayload {
  newPassword: string;
  confirmNewPassword: string;
}

export interface GenericResponse {
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

