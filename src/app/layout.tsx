import ClientProviders from "@/components/ClientProviders";
import React from "react";

export const metadata = {
  title: "Pizza Ordering App",
  description: "Order your favorite pizza online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Everything that needs React hooks or MUI theme lives in ClientProviders */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
