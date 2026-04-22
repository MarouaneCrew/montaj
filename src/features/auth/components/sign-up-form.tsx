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
import { signUp } from "../api";
import { type SignUpInput, SignUpSchema } from "../schemas";
import { OAuthButtons } from "./oauth-buttons";

export function SignUpForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (values: SignUpInput) => {
    setSubmitError(null);
    try {
      await signUp(values);
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
        <h1 className="text-3xl font-bold text-fg">Sign up</h1>
      </div>

      <OAuthButtons mode="sign-up" />

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

        <Field
          label="Password"
          error={errors.password?.message}
          hint={errors.password?.message ? undefined : "Use at least 6 characters"}
        >
          {(fieldProps) => (
            <PasswordInput
              {...fieldProps}
              {...register("password")}
              autoComplete="new-password"
              placeholder="Use at least 6 characters"
            />
          )}
        </Field>

        {submitError && (
          <p className="text-sm text-destructive-600" role="alert">
            {submitError}
          </p>
        )}

        <Button type="submit" intent="primary" className="w-full h-11" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Continue with email"}
        </Button>
      </form>

      <p className="text-center text-sm text-fg-muted">
        Already have an account?{" "}
        <Link
          href={routes.logIn}
          className="font-medium text-fg underline-offset-4 hover:underline"
        >
          Log in
        </Link>
      </p>

      <p className="text-center text-xs text-fg-muted">
        By continuing you agree to our{" "}
        <Link href="#" className="underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="#" className="underline">
          Terms of Service
        </Link>
        .
      </p>
    </div>
  );
}
