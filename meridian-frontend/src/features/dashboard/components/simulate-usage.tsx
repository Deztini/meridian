"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { SimulateUsageFormInput, simulateUsageSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSimulateUsage } from "../hooks/useSimulateUsage";

export function SimulateUsage() {
  const { register, handleSubmit } = useForm<SimulateUsageFormInput>({
    resolver: zodResolver(simulateUsageSchema),
    defaultValues: { eventType: "api_call" },
  });
  const { mutate } = useSimulateUsage();

  const onSubmit = (values: SimulateUsageFormInput) => {
    mutate(values);
  };

  return (
    <>
    <div className=" py-4 px-6 solid border border-gray-300 rounded-sm my-2 mx-22 bg-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-4"
      >
        <Input
          id="count"
          {...register("count", { valueAsNumber: true })}
          className="w-20 rounded-none"
          type="number"
          defaultValue={100}
        />

        <Button
          type="submit"
          className="py-2 px-5 rounded cursor-pointer bg-transparent border border-gray-300 text-black hover:bg-gray-100"
        >
          Simulate usage
        </Button>
      </form>
    </div>

    <hr className="border-t border-gray-300 mx-22 mt-13" />
    </>
  );
}
