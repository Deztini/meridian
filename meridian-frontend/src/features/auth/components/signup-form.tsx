"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, signupSchema } from "../schema";
import { useSignup } from "../hooks/useSignup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PasswordInput } from "../../../components/password-input";

export function SignupForm() {
  const router = useRouter();
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

  useEffect(() => {
    if (isSuccess) {
      router.push("/verify");
    }
  }, [isSuccess, router]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="fullName" className="text-muted-foreground text-xs font-sans">
          FULL NAME
        </Label>
        <Input
          id="fullName"
          {...register("fullName")}
          className="rounded-sm py-5  focus:border-blue-500"
          placeholder="John Doe"
        />
        {errors.fullName && (
          <p className="text-sm text-red-500 font-sans">{errors.fullName.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="text-muted-foreground text-xs font-sans">
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
          <p className="text-sm text-red-500 font-sans">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password" className="text-muted-foreground text-xs font-sans">
          PASSWORD
        </Label>
        <PasswordInput
           id="password"
          {...register("password")}
          className="rounded-sm py-5"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-sm text-red-500 font-sans">{errors.password.message}</p>
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
          {...register("confirmPassword")}
          className="rounded-sm py-5"
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 font-sans">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

     

      <Button
        type="submit"
        disabled={isPending}
        className="w-full md:w-[390] px-6 py-5 rounded-sm cursor-pointer font-sans"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create account"}
      </Button>
    </form>
  );
}
