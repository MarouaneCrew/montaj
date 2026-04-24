"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LogoMark } from "@/components/layout/logo-mark";
import { Field, Input, PasswordInput } from "@/components/ui";
import { routes } from "@/config/routes";
import { Link, useRouter } from "@/i18n/navigation";
import { ApiError } from "@/lib/api/errors";
import { logIn } from "../api";
import { type LogInInput, LogInSchema } from "../schemas";
import { LegalNotice } from "./legal-notice";
import { OAuthButtons } from "./oauth-buttons";
import { SubmitButton } from "./submit-button";

export function LogInForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const t = useTranslations("auth");

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
      setSubmitError(error instanceof ApiError ? error.message : t("errors.generic"));
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-5">
        <LogoMark />
        <h1 className="text-4xl font-bold tracking-tight text-fg">{t("login.title")}</h1>
      </div>

      <OAuthButtons mode="log-in" />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
        <Field label={t("form.emailLabel")} error={errors.email?.message}>
          {(fp) => (
            <Input
              {...fp}
              {...register("email")}
              type="email"
              autoComplete="email"
              placeholder={t("form.emailPlaceholder")}
            />
          )}
        </Field>

        <Field label={t("form.passwordLabel")} error={errors.password?.message}>
          {(fp) => (
            <PasswordInput
              {...fp}
              {...register("password")}
              autoComplete="current-password"
              placeholder={t("form.passwordPlaceholder")}
            />
          )}
        </Field>

        {submitError && (
          <p className="text-sm text-destructive-600" role="alert">
            {submitError}
          </p>
        )}

        <SubmitButton isSubmitting={isSubmitting} pendingLabel={t("login.pendingLabel")} />

        <div className="flex flex-col items-center gap-1 text-sm text-fg-muted">
          <p>
            {t.rich("login.noAccount", {
              link: (chunks) => (
                <Link href={routes.signUp} className="font-semibold text-fg hover:underline">
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <p>
            {t.rich("login.forgotPassword", {
              link: (chunks) => (
                <Link href="#" className="font-semibold text-fg hover:underline">
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </form>

      <LegalNotice />
    </div>
  );
}
