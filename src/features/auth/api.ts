import { request } from "@/lib/api/client";
import { type LogInInput, type Session, SessionSchema, type SignUpInput } from "./schemas";

export function signUp(input: SignUpInput): Promise<Session> {
  return request("/auth/sign-up", {
    method: "POST",
    body: input,
    schema: SessionSchema,
  });
}

export function logIn(input: LogInInput): Promise<Session> {
  return request("/auth/log-in", {
    method: "POST",
    body: input,
    schema: SessionSchema,
  });
}

export function logOut(): Promise<void> {
  return request("/auth/log-out", { method: "POST" });
}
