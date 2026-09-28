"use client";
import { EntryCard } from "@/components/entry-card";
import { PageHeader } from "@/components/page-header";
import { useLogs } from "@/components/log-provider";

const dateLabel = (value: string) => new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "short" }).format(new Date(`${value}T12:00:00`));
export default function TimelinePage() {
  const { entries } = useLogs();
  return <><PageHeader title="나의 타임라인" subtitle="제주에서 쌓은 순간들이에요" /><div className="px-5 pb-5">{entries.map((entry, index) => <div key={entry.id} className="relative pl-7"><div className="absolute bottom-0 left-[5px] top-0 w-px bg-[#d7dcd7]" /><div className="absolute left-0 top-1 size-[11px] rounded-full border-[3px] border-[#f8f6f0] bg-[#e87843] ring-1 ring-[#e87843]" /><p className={`${index ? "pt-7" : ""} mb-3 text-sm font-bold text-[#68716b]`}>{dateLabel(entry.date)}</p><EntryCard entry={entry} /></div>)}</div></>;
}
