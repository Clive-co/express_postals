// app/dashboard/layout.tsx
import "@/css/satoshi.css";
import "@/css/style.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import { Sidebar } from "@/components/Layouts/sidebar";
import { Header }  from "@/components/Layouts/header";
import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";
import { redirect } from "next/navigation";
import { headers } from "next/headers";        
import type { Metadata, ReactNode } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Express Postals Dashboard",
    default: "Express Postals Dashboard",
  },
  description: "Express Postals management dashboard",
  icons: {
    icon: "/images/logo3.png",
    apple: "/images/logo3.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // 1) Await headers() before accessing its values
  const headersList = await headers();
  const cookieHeader = headersList.get("cookie") || "";

  // 2) Build the full URL (use an env var in production!)
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? "https://www.express-postals.com"
      : "http://localhost:3000";

  // 3) Fetch the auth/me endpoint over HTTP, forwarding cookies
  const res = await fetch(`${baseUrl}/api/auth/me`, {
    cache: "no-store",
    headers: {
      cookie: cookieHeader,
    },
  });

  // 4) Not logged in? redirect to /login
  if (!res.ok) {
    redirect("/login");
  }

  // 5) Otherwise parse the user and render the full dashboard
  const { user } = await res.json();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />

          <div className="flex min-h-screen">
            <Sidebar />

            <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
              <Header user={user} />

              <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
