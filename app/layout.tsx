import type { Metadata } from "next";
import "./globals.css";
import "./reference.css";
export const metadata: Metadata = {
  title: "raosocialblade.com — Websites, Design & Digital Growth",
  description: "Build a brand people trust. Digital marketing, website development and graphic design for ambitious Indian businesses. Plan your project with raosocialblade.com",
  robots: { index: false, follow: false },
  icons: { icon: "/rao-logo.png" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
