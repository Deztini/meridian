import { VerifyForm } from "@/features/auth/components/verify-form";
import { BackButton } from "@/components/back-button";

export default function VerifyOtpPage() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <BackButton buttonText="Back" />
      <div className="flex flex-col gap-2 mb-8">
        <span className="text-xl text-black font-medium">Verify your identity</span>
        <span className="text-muted-foreground text-sm">
          We sent a 6-digit code to your email. Enter it below.
        </span>
      </div>
      <VerifyForm />
    </div>
  );
}
