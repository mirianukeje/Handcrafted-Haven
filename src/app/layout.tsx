import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AuthSessionProvider from "@/components/providers/AuthSessionProvider";
import { getAuthSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Handcrafted Haven",
  description: "Marketplace for handcrafted items",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuthSession();

  return (
    <html lang="en">
      <body>
        <AuthSessionProvider session={session}>
          <Navbar />
          <main className="pt-24">{children}</main>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
