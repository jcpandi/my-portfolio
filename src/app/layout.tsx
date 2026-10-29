import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JC Pandi — Web Designer & Front-end Developer",
  description: "Thoughtful design. Beautifully built. A portfolio of expressive websites, intuitive interfaces, and considered digital experiences.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

