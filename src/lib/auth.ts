import { db } from "@/db";
import * as schema from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { reactStartCookies } from "better-auth/react-start";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  plugins: [reactStartCookies()],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
});
