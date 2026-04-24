"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LogoMark } from "@/components/layout/logo-mark";
import { Field, Input, PasswordInput } from "@/components/ui";
import { routes } from "@/config/routes";
import { Link, useRouter } from "@/i18n/navigation";
import { ApiError } from "@/lib/api/errors";
import { logIn } from "../api";
import { type LogInInput, LogInSchema } from "../schemas";
import { OAuthButtons } from "./oauth-buttons";
import { SubmitButton } from "./submit-button";

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
      router.push(routes.dashboard);
    } catch (error) {
      setSubmitError(
        error instanceof ApiError ? error.message : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-5">
        <LogoMark />
        <h1 className="text-4xl font-bold tracking-tight text-fg">Log in</h1>
      </div>

      <OAuthButtons mode="log-in" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <Field label="Email" error={errors.email?.message}>
          {(fp) => (
            <Input
              {...fp}
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder="Enter your email"
            />
          )}
        </Field>

        <Field label="Password" error={errors.password?.message}>
          {(fp) => (
            <PasswordInput
              {...fp}
              {...register("password")}
              autoComplete="current-password"
              placeholder="Use at least 6 characters"
            />
          )}
        </Field>

        {submitError && (
          <p className="text-sm text-destructive-600" role="alert">
            {submitError}
          </p>
        )}

        <SubmitButton isSubmitting={isSubmitting} pendingLabel="Logging in..." />

        <div className="flex flex-col items-center gap-1 text-sm text-fg-muted">
          <p>
            No account?{" "}
            <Link href={routes.signUp} className="font-semibold text-fg hover:underline">
              Create one now
            </Link>
          </p>
          <p>
            Forgot your password?{" "}
            <Link href="#" className="font-semibold text-fg hover:underline">
              Recover now
            </Link>
          </p>
        </div>
      </form>

      <p className="text-center text-sm text-fg-muted">
        By continuing you agree to our{" "}
        <Link href="#" className="underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
