"use client";

import { useTranslations } from "next-intl";

type OAuthProvider = "google" | "apple";

type OAuthButtonsProps = {
  mode: "sign-up" | "log-in";
  onSelect?: (provider: OAuthProvider) => void;
};

export function OAuthButtons({ mode, onSelect }: OAuthButtonsProps) {
  const t = useTranslations("auth.oauth");
  const key = mode === "log-in" ? "loginWith" : "signupWith";

  return (
    <div className="flex flex-col gap-2">
      <OAuthButton provider="google" label={t(key, { provider: t("google") })} onClick={onSelect}>
        <GoogleIcon />
      </OAuthButton>
      <OAuthButton provider="apple" label={t(key, { provider: t("apple") })} onClick={onSelect}>
        <AppleIcon />
      </OAuthButton>
    </div>
  );
}

type OAuthButtonProps = {
  provider: OAuthProvider;
  label: string;
  onClick?: (provider: OAuthProvider) => void;
  children: React.ReactNode;
};

function OAuthButton({ provider, label, onClick, children }: OAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(provider)}
      className="flex h-11 w-full items-center justify-center gap-2.5 rounded-lg bg-muted text-sm font-medium text-fg transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {children}
      {label}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M19.6051 10.2304C19.6051 9.55059 19.55 8.86714 19.4324 8.19839H10.0001V12.0492H15.4015C15.1774 13.2912 14.4572 14.3898 13.4026 15.088V17.5866H16.6251C18.5174 15.8449 19.6051 13.2728 19.6051 10.2304Z"
        fill="#1E1E1E"
      />
      <path
        d="M9.99995 20.0007C12.697 20.0007 14.9715 19.1151 16.6286 17.5866L13.4062 15.088C12.5096 15.6979 11.3521 16.0433 10.0036 16.0433C7.39476 16.0433 5.18275 14.2833 4.38907 11.9169H1.0637V14.4927C2.76129 17.8695 6.21894 20.0007 9.99995 20.0007Z"
        fill="#1E1E1E"
      />
      <path
        d="M4.38551 11.9169C3.96662 10.6749 3.96662 9.33009 4.38551 8.08812V5.51234H1.06381C-0.354528 8.33799 -0.35464 11.667 1.0637 14.4927L4.38551 11.9169Z"
        fill="#1E1E1E"
      />
      <path
        d="M9.99994 3.95805C11.4256 3.936 12.8035 4.47247 13.8361 5.45722L16.6911 2.60218C14.8833 0.904587 12.4839 -0.0287217 9.99994 0.000673888C6.21894 0.000673888 2.7614 2.13185 1.06381 5.51234L4.38551 8.08812C5.17551 5.71811 7.39109 3.95805 9.99994 3.95805Z"
        fill="#1E1E1E"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="20"
      viewBox="0 0 18 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M17.6227 16.6534C17.2996 17.4 16.917 18.0872 16.4738 18.7191C15.8697 19.5804 15.3751 20.1766 14.9938 20.5077C14.4029 21.0512 13.7698 21.3295 13.0917 21.3453C12.605 21.3453 12.018 21.2068 11.3348 20.9259C10.6492 20.6462 10.0192 20.5077 9.44321 20.5077C8.83908 20.5077 8.19115 20.6462 7.49811 20.9259C6.80402 21.2068 6.24486 21.3532 5.81735 21.3678C5.16718 21.3955 4.51913 21.1092 3.87226 20.5077C3.45939 20.1476 2.94297 19.5303 2.32433 18.6557C1.66057 17.7218 1.11488 16.6389 0.687366 15.4042C0.229518 14.0707 0 12.7793 0 11.5291C0 10.097 0.309453 8.86178 0.929283 7.82671C1.41642 6.9953 2.06447 6.33946 2.87557 5.85799C3.68666 5.37653 4.56305 5.13119 5.50684 5.11549C6.02326 5.11549 6.70047 5.27523 7.54204 5.58917C8.38123 5.90416 8.92006 6.0639 9.15631 6.0639C9.33293 6.0639 9.93153 5.87712 10.9463 5.50475C11.9059 5.15941 12.7158 5.01643 13.3793 5.07275C15.1772 5.21785 16.5279 5.92659 17.4262 7.20345C15.8183 8.17771 15.0229 9.54229 15.0387 11.2928C15.0532 12.6564 15.5479 13.791 16.52 14.6919C16.9606 15.1101 17.4526 15.4333 18 15.6628C17.8813 16.0071 17.756 16.3368 17.6227 16.6534ZM13.4993 0.427514C13.4993 1.49624 13.1089 2.4941 12.3306 3.41771C11.3915 4.51571 10.2555 5.15018 9.02361 5.05006C9.00792 4.92185 8.99881 4.78691 8.99881 4.64511C8.99881 3.61914 9.44545 2.52114 10.2386 1.62338C10.6346 1.16883 11.1382 0.790878 11.7489 0.489377C12.3583 0.192375 12.9348 0.0281268 13.4769 0C13.4927 0.142872 13.4993 0.285766 13.4993 0.427514Z"
        fill="#1E1E1E"
      />
    </svg>
  );
}
