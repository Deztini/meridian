"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import Link from "next/link";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, error } = useLogin();

  const onSubmit = (values: LoginFormValues) => {
    mutate(values);
  };
  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-muted-foreground text-xs">
            EMAIL
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

        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-muted-foreground text-xs">
            PASSWORD
          </Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            className="rounded-sm py-5"
            placeholder="Create a strong password"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
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
          {isPending ? "Signing..." : "Sign in"}
        </Button>
      </form>

      <div className="flex justify-end">
        <Link
          href="/forgot-password"
          className="text-sm text-muted-foreground hover:text-blue-600 cursor-pointer"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
