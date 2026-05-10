import type { Metadata } from "next";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { JungleBackdrop } from "@/components/JungleBackdrop";

export const metadata: Metadata = {
  title: "Pergunte ao Macaco 🐒",
  description: "Não consegue decidir? Deixa o macaco escolher por você.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <JungleBackdrop />
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
