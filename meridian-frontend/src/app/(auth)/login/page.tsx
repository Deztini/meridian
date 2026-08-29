import { LoginForm } from "@/features/auth/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-medium">Sign in to Meridian</h1>
        <div className="flex gap-2 items-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?
          </p>
          <Link href={"/signup"} className="text-blue-600 hover:underline">
            Create one
          </Link>
        </div>
      </div>
      <LoginForm />
    </div>
  );
}
