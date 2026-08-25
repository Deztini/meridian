export interface SignupPayload {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyPayload {
  otp: string;
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
