import type { ZodType } from "zod";
import { ApiError } from "./errors";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "/api";

type RequestOptions<T> = {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: unknown;
  schema?: ZodType<T>;
  signal?: AbortSignal;
  headers?: Record<string, string>;
};

export async function request<T>(path: string, options: RequestOptions<T> = {}): Promise<T> {
  const { method = "GET", body, schema, signal, headers } = options;

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      signal,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    });
  } catch (cause) {
    throw new ApiError(0, "network_error", "Network request failed", cause);
  }

  if (!response.ok) {
    const errorBody = await safeJson(response);
    throw new ApiError(
      response.status,
      typeof errorBody?.code === "string" ? errorBody.code : "unknown_error",
      typeof errorBody?.message === "string" ? errorBody.message : response.statusText,
      errorBody,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json();
  return schema ? schema.parse(data) : (data as T);
}

async function safeJson(response: Response): Promise<Record<string, unknown> | null> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}
