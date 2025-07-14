import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { auth } from "@/lib/auth";
import { getWebRequest } from "@tanstack/react-start/server";
import { authMiddleware } from "@/lib/middleware";

export const getCurrentUser = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async () => {
    const request = getWebRequest();
    return auth.api.getSession(request);
  });

export const Route = createFileRoute("/")({
  component: Home,
  loader: () => getCurrentUser(),
});

function Home() {
  const session = Route.useLoaderData();

  console.log("Session on Home is");
  console.log(session?.user.name);

  return (
    <>
      <div>This will be the main dashboard eventually!</div>
      <p>
        The current user is {session?.user.name} with a session of{" "}
        {session?.session.id}
      </p>
    </>
  );
}
