/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";

import appCss from "@/styles/app.css?url";
import { Toaster } from "@/components/ui/sonner";
import { DraftingCompass } from "lucide-react";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start Starter",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function NotFoundComponent() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex w-full items-center justify-center border-b">
        <div className="flex w-full max-w-[1280px] items-center py-4 gap-x-8 px-4 md:px-8">
          <div className="md:flex-0 min-w-fit flex-1">
            <Link to="/" className="pointer flex items-center">
              <DraftingCompass className="!size-5" />
              <span className="text-base font-semibold">ArchiPlan</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto my-20 flex h-full w-full max-w-[1280px] flex-1 justify-center">
        <main className="flex h-full w-full flex-col items-center gap-24 px-8 pb-24 pt-11 text-center md:gap-36 md:px-32 md:py-36">
          <section id="features" className="flex flex-col items-center gap-12">
            <h1 className="max-w-2xl !text-5xl md:!text-7xl">404</h1>
            <h5 className="max-w-2xl !text-xl md:!text-xl">
              Sorry! We could not find this page. But don&apos;t worry, there is
              plenty of other things to see. Go look at those!
            </h5>
            <Link to="/" className="underline">
              Go Back
            </Link>
          </section>
        </main>
      </div>
    </main>
  );
}

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}
