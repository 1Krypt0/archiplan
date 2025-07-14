import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="mx-auto my-20 flex h-full w-full max-w-[1280px] flex-1 justify-center">
        <Outlet />
      </div>
    </main>
  );
}
