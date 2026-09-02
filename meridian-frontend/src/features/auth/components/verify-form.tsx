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
import { useEffect, useState } from "react";
import { useResendOtp } from "../hooks/useResendOtp";
import { useRouter, useSearchParams } from "next/navigation";
import { OtpFlow } from "../types";

export function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { otp: "" },
  });

  const flow = (searchParams.get("flow") as OtpFlow) ?? "signup";

  const [counter, setCounter] = useState(0);

  const { mutate, isPending, isSuccess, error } = useVerify(flow);
  const {
    mutate: mutateResend,
    isPending: ResendIsPending,
    error: resendError,
  } = useResendOtp(flow);

  const onSubmit = (value: VerifyOtpFormValues) => {
    mutate(value);
  };

  const onResend = () => {
    mutateResend();
    setCounter(60);
  };

  useEffect(() => {
    if (counter <= 0) return;

    let timer: ReturnType<typeof setTimeout>;
    if (counter > 0) {
      timer = setTimeout(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [counter]);

  useEffect(() => {
    if (isSuccess) {
      if (flow === "reset-password") {
        router.push("/reset-password");
      } else {
        router.push("/login");
      }
    }
  }, [isSuccess, router, flow]);

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
        <div className="text-xs text-muted-foreground">
          Didn't receive the code?
        </div>
        <div>
          {counter > 0 ? (
            <span className="text-xs text-gray-400">
              Resend in {`${counter}s`}
            </span>
          ) : (
            <div
              onClick={onResend}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Resend code
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
