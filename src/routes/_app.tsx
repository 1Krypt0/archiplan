import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";

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

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
  loader: () => getCurrentUser(),
});

function RouteComponent() {
  const session = Route.useLoaderData();
  const navigate = useNavigate({ from: "/" });

  if (!session) {
    return navigate({ to: "/login" });
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" user={session.user} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col h-full  gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
