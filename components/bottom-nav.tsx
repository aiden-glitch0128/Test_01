"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";
const links = [{ href: "/", label: "홈", icon: "home" as const }, { href: "/timeline", label: "타임라인", icon: "timeline" as const }, { href: "/new", label: "기록", icon: "plus" as const, primary: true }, { href: "/stats", label: "통계", icon: "chart" as const }];
export function BottomNav() {
  const path = usePathname();
  return <nav aria-label="주요 메뉴" className="bottom-safe fixed inset-x-0 bottom-0 z-50 mx-auto max-w-2xl border-t border-[#e5e0d5] bg-[#fffdf9]/95 px-4 pt-2 backdrop-blur-lg"><div className="flex items-end justify-around">{links.map((item) => { const active = path === item.href; return <Link key={item.href} href={item.href} className={`flex min-h-14 min-w-16 flex-col items-center justify-center gap-1 text-[11px] font-semibold ${active ? "text-[#315c49]" : "text-[#8a8d86]"}`}><span className={item.primary ? "-mt-7 flex size-14 items-center justify-center rounded-full bg-[#315c49] text-white shadow-lg shadow-[#315c49]/20" : ""}><Icon name={item.icon} className="size-6" /></span>{item.label}</Link>; })}</div></nav>;
}
