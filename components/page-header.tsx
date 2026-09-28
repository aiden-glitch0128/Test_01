import Link from "next/link";
import { Icon } from "./icons";
export function PageHeader({ title, subtitle, back }: { title: string; subtitle?: string; back?: boolean }) {
  return <header className="flex min-h-24 items-center gap-3 px-5 pt-4">{back && <Link href="/" aria-label="홈으로 돌아가기" className="flex size-11 rotate-180 items-center justify-center rounded-full bg-white"><Icon name="arrow" className="size-5" /></Link>}<div><h1 className="text-2xl font-extrabold tracking-[-.04em]">{title}</h1>{subtitle && <p className="mt-1 text-sm text-[#7b817c]">{subtitle}</p>}</div></header>;
}
