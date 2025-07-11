import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex w-full items-center justify-center border-b">
        <div className="flex w-full max-w-[1280px] items-center py-4 gap-x-8 px-4 md:px-8">
          <div className="md:flex-0 min-w-fit flex-1">
            <Link to="/" className="pointer flex items-center">
              <img src="/logo.svg" alt="Logo" width={150} height={100} />
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto my-20 flex h-full w-full max-w-[1280px] flex-1 justify-center">
        <Outlet />
      </div>

      <div>This will eventually be the footer!</div>
    </main>
  );
}
