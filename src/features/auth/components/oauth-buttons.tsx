"use client";

import { Button } from "@/components/ui";

type OAuthProvider = "google" | "apple";

type OAuthButtonsProps = {
  mode: "sign-up" | "log-in";
  onSelect?: (provider: OAuthProvider) => void;
};

const labels = {
  "sign-up": { google: "Sign up with Google", apple: "Sign up with Apple" },
  "log-in": { google: "Log in with Google", apple: "Log in with Apple" },
};

export function OAuthButtons({ mode, onSelect }: OAuthButtonsProps) {
  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        intent="outline"
        className="w-full h-11"
        onClick={() => onSelect?.("google")}
      >
        <GoogleIcon />
        {labels[mode].google}
      </Button>
      <Button
        type="button"
        intent="outline"
        className="w-full h-11"
        onClick={() => onSelect?.("apple")}
      >
        <AppleIcon />
        {labels[mode].apple}
      </Button>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <title>Google</title>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.55c2.08-1.92 3.29-4.74 3.29-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.55-2.76c-.98.66-2.24 1.06-3.73 1.06-2.87 0-5.3-1.94-6.16-4.54H2.18v2.85A10.99 10.99 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a10.99 10.99 0 0 0 0 9.9l3.66-2.85z"
      />
      <path
        fill="#EA4335"
        d="M12 5.4c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.1 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.05L5.84 9.9C6.7 7.3 9.13 5.4 12 5.4z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
      <title>Apple</title>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.07zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
