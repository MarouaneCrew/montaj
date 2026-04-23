import { Button } from "@/components/ui";

type SubmitButtonProps = {
  isSubmitting: boolean;
  label?: string;
  pendingLabel?: string;
};

export function SubmitButton({
  isSubmitting,
  label = "Continue with email",
  pendingLabel = "Please wait...",
}: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      intent="primary"
      className="h-12 w-full rounded-lg"
      disabled={isSubmitting}
    >
      {isSubmitting ? pendingLabel : label}
      {!isSubmitting && <ArrowIcon />}
    </Button>
  );
}

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12.3214 5.75H0.75M7.60715 10.75C7.60715 10.75 12.75 7.06758 12.75 5.75C12.75 4.43233 7.60715 0.75 7.60715 0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
