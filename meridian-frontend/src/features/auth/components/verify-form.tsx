"use client";

import { Controller, useForm } from "react-hook-form";
import { VerifyOtpFormValues, verifyOtpSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVerify } from "../hooks/useVerify";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

export function VerifyForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { otp: "" },
  });

  const { mutate, isPending, error } = useVerify();

  const onSubmit = (value: VerifyOtpFormValues) => {
    mutate(value);
  };

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
            >
              <InputOTPGroup className="gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="h-14 w-14 rounded-md border"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          )}
        />

        {errors.otp && (
          <p className="text-sm text-red-500">{errors.otp.message}</p>
        )}
        {error && (
          <p className="text-sm text-red-500">Invalid or expired code.</p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full md:w-[400] px-6 py-5 rounded-sm cursor-pointer"
        >
          {isPending ? "Verifying..." : "Verify"}
        </Button>
      </form>

      <div className="flex gap-2 items-center ml-2">
        <span className="text-xs text-muted-foreground">
          Didn't receive the code?
        </span>
        <div className="text-blue-600 hover:underline cursor-pointer">
          Resend code
        </div>
      </div>
    </div>
  );
}
