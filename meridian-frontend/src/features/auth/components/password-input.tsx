"use client";

import { Input } from "@/components/ui/input";
import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
export const PasswordInput = forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        ref={ref}
        className={`pr-10 ${className ?? ""}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-3 top-3 bottom-6 translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
