import { getSessionCookie } from "better-auth/cookies";
import { redirect } from "@tanstack/react-router";
import { getWebRequest } from "@tanstack/react-start/server";
import { createMiddleware } from "@tanstack/react-start";

export const authMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const request = getWebRequest();

    const cookies = getSessionCookie(request);

    if (!cookies) {
      throw redirect({ to: "/login" });
    }

    return await next();
  },
);
