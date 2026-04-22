"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LogoMark } from "@/components/layout/logo-mark";
import { Button, Field, Input, PasswordInput } from "@/components/ui";
import { routes } from "@/config/routes";
import { ApiError } from "@/lib/api/errors";
import { logIn } from "../api";
import { type LogInInput, LogInSchema } from "../schemas";
import { OAuthButtons } from "./oauth-buttons";

export function LogInForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LogInInput>({
    resolver: zodResolver(LogInSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (values: LogInInput) => {
    setSubmitError(null);
    try {
      await logIn(values);
      router.push(routes.home);
    } catch (error) {
      if (error instanceof ApiError) {
        setSubmitError(error.message);
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4">
        <LogoMark />
        <h1 className="text-3xl font-bold text-fg">Welcome back</h1>
      </div>

      <OAuthButtons mode="log-in" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <Field label="Email" error={errors.email?.message}>
          {(fieldProps) => (
            <Input
              {...fieldProps}
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
            />
          )}
        </Field>

        <Field label="Password" error={errors.password?.message}>
          {(fieldProps) => (
            <PasswordInput
              {...fieldProps}
              {...register("password")}
              autoComplete="current-password"
              placeholder="Enter your password"
            />
          )}
        </Field>

        {submitError && (
          <p className="text-sm text-destructive-600" role="alert">
            {submitError}
          </p>
        )}

        <Button type="submit" intent="primary" className="w-full h-11" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Continue with email"}
        </Button>
      </form>

      <p className="text-center text-sm text-fg-muted">
        Don&apos;t have an account?{" "}
        <Link
          href={routes.signUp}
          className="font-medium text-fg underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
