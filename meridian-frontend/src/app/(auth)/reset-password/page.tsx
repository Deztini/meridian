import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="flex flex-col gap-2">
        <span className="text-2xl text-black font-heading">
          Set a new password
        </span>
        <span className="text-muted-foreground text-sm font-sans">
          Choose a strong password you haven&apos;t used before.
        </span>
      </div>
      <ResetPasswordForm />
    </div>
  );
}
