import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "./providers";
export const metadata: Metadata = {
  title: "Pet Breeds App",
  description: "Explore different cat and dog breeds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}