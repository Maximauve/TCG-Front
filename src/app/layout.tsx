import type { Metadata } from "next";
import "@/assets/styles/globals.css";
import ClientLayout from "@/src/layout/ClientLayout";

export const metadata: Metadata = {
  title: "TCG",
  description: "TCG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
