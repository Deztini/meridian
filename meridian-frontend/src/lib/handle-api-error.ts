import { AxiosError } from "axios";

interface ApiErrorShape {
  success: boolean;
  message: string;
  statusCode: number;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorShape | undefined;

    if (data?.message) {
      return data.message;
    }

    if (error.code === "ERR_NETWORK") {
      return "Can't reach the server. Check your connection and try again.";
    }

    if (error.response?.status === 500) {
      return "Something went wrong on our end. Please try again later";
    }
  }
  return "Something went wrong on our end. Please try again later";
}
