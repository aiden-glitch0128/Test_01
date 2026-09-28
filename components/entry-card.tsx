import Image from "next/image";
import { categoryStyle, currency } from "@/lib/format";
import type { LogEntry } from "@/lib/types";
export function EntryCard({ entry, compact = false }: { entry: LogEntry; compact?: boolean }) {
  return <article className="card-shadow overflow-hidden rounded-[22px] bg-[#fffdf9]">
    {entry.image && <div className={`relative w-full ${compact ? "h-36" : "h-48"}`}><Image src={entry.image} alt={`${entry.place}에서의 기록`} fill className="object-cover" /></div>}
    <div className="p-4"><div className="flex items-start justify-between gap-3"><div><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${categoryStyle[entry.category]}`}>{entry.category}</span><h3 className="mt-2 text-lg font-bold tracking-tight">{entry.place}</h3></div>{entry.expense > 0 && <strong className="whitespace-nowrap pt-1 text-sm">{currency(entry.expense)}</strong>}</div>
      <p className={`mt-2 text-sm leading-6 text-[#68716b] ${compact ? "line-clamp-2" : ""}`}>{entry.memo}</p>
    </div></article>;
}
