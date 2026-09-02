import { BackButton } from "@/components/back-button";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <BackButton buttonText="Back to sign in" />
      <div className="flex flex-col gap-2 mb-4">
        <span className="text-xl text-black font-medium">
          Forgot your password?
        </span>
        <span className="text-muted-foreground text-sm">
          Enter your account email and we'll send you a reset code.
        </span>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
