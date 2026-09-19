"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ResetPasswordFormValues, resetPasswordSchema } from "../schema";
import { useResetPassword } from "../hooks/useResetPassword";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function ResetPasswordForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const { mutate, isPending, isSuccess, error } = useResetPassword();

  const onSubmit = (values: ResetPasswordFormValues) => {
    mutate(values);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push("/login");
    }
  }, [isSuccess, router]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="newPassword" className="text-muted-foreground text-xs font-sans">
          NEW PASSWORD
        </Label>
        <PasswordInput
          id="newPassword"
          {...register("newPassword")}
          className="rounded-sm py-5"
          placeholder="••••••••"
        />
        {errors.newPassword && (
          <p className="text-sm text-red-500 font-sans">{errors.newPassword.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Label
          htmlFor="confirmPassword"
          className="text-muted-foreground text-xs font-sans"
        >
          CONFIRM PASSWORD
        </Label>
        <PasswordInput
          id="confirmPassword"
          {...register("confirmNewPassword")}
          className="rounded-sm py-5"
          placeholder="••••••••"
        />
        {errors.confirmNewPassword && (
          <p className="text-sm text-red-500 font-sans">
            {errors.confirmNewPassword.message}
          </p>
        )}
      </div>

   

      <Button
        type="submit"
        disabled={isPending}
        className="w-full md:w-[390] px-6 py-5 rounded-sm cursor-pointer font-sans"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update password"}
      </Button>
    </form>
  );
}
