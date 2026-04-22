import { HttpResponse, http } from "msw";

const mockUser = {
  id: "user_1",
  email: "demo@muntaj.app",
  name: "Demo User",
  avatarUrl: null,
  createdAt: new Date("2026-01-01").toISOString(),
};

const mockSession = {
  user: mockUser,
  token: "mock_token_abc123",
};

export const handlers = [
  http.post("/api/auth/sign-up", async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    if (body.email === "taken@muntaj.app") {
      return HttpResponse.json(
        { code: "email_taken", message: "This email is already registered" },
        { status: 409 },
      );
    }
    return HttpResponse.json({ ...mockSession, user: { ...mockUser, email: body.email } });
  }),

  http.post("/api/auth/log-in", async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    if (body.password === "wrong") {
      return HttpResponse.json(
        { code: "invalid_credentials", message: "Invalid email or password" },
        { status: 401 },
      );
    }
    return HttpResponse.json({ ...mockSession, user: { ...mockUser, email: body.email } });
  }),

  http.post("/api/auth/log-out", () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
