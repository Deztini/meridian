"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormValues, forgotPasswordSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForgotPassword } from "../hooks/useForgotPassword";

export function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const { mutate, isPending, error } = useForgotPassword();

  const onSubmit = (values: ForgotPasswordFormValues) => {
    mutate(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-muted-foreground text-xs">
          EMAIL ADDRESS
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="rounded-sm py-5"
          placeholder="johndoe@gmail.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500">
          Something went wrong. Please try again
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full md:w-[390] px-6 py-5 rounded-sm cursor-pointer"
      >
        {isPending ? "Sending..." : "Send reset code"}
      </Button>
    </form>
  );
}
