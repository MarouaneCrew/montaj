"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LogoMark } from "@/components/layout/logo-mark";
import { Field, Input, PasswordInput } from "@/components/ui";
import { routes } from "@/config/routes";
import { Link, useRouter } from "@/i18n/navigation";
import { ApiError } from "@/lib/api/errors";
import { signUp } from "../api";
import { type SignUpInput, SignUpSchema } from "../schemas";
import { OAuthButtons } from "./oauth-buttons";
import { SubmitButton } from "./submit-button";

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
        <h1 className="text-4xl font-bold tracking-tight text-fg">Sign up</h1>
      </div>

      <OAuthButtons mode="sign-up" />

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

        <SubmitButton isSubmitting={isSubmitting} pendingLabel="Creating account..." />

        <p className="text-center text-sm text-fg-muted">
          Already have an account?{" "}
          <Link href={routes.logIn} className="font-semibold text-fg hover:underline">
            Log in
          </Link>
        </p>
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
