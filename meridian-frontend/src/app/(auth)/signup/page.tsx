import { SignupForm } from "@/features/auth/components/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl ">Create your account</h1>
        <div className="flex gap-2 items-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?
          </p>
          <Link href={"/"} className="text-blue-600">
            Sign in
          </Link>
        </div>
      </div>
      <SignupForm />
    </div>
  );
}
