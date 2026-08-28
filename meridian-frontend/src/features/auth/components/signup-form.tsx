"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, signupSchema } from "../schema";
import { useSignup } from "../hooks/use-signup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const { mutate, isPending, isSuccess, error } = useSignup();

  const onSubmit = (values: SignupFormValues) => {
    mutate(values);
  };

  if (isSuccess) {
    return <p>Check your email for verification code</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="fullName" className="text-muted-foreground text-xs">
          FULL NAME
        </Label>
        <Input
          id="fullName"
          {...register("fullName")}
          className="rounded-sm py-5  focus:border-blue-500"
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName.message}</p>
        )}
      </div>

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

      <div className="flex flex-col gap-2">
        <Label
          htmlFor="confirmPassword"
          className="text-muted-foreground text-xs"
        >
          CONFIRM PASSWORD
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className="rounded-sm py-5"
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">
            {errors.confirmPassword.message}
          </p>
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
        {isPending ? "Creating..." : "Create account"}
      </Button>
    </form>
  );
}
