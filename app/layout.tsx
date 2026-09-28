import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/bottom-nav";
import { LogProvider } from "@/components/log-provider";

export const metadata: Metadata = {
  title: "Jeju Month Log",
  description: "제주 한 달의 순간을 기록하는 여행 로그",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#f8f6f0" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body><LogProvider><main className="safe-bottom mx-auto min-h-dvh max-w-2xl">{children}</main><BottomNav /></LogProvider></body></html>;
}
