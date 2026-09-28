"use client";
import Link from "next/link";
import { EntryCard } from "@/components/entry-card";
import { Icon } from "@/components/icons";
import { currency, fullKoreanDate } from "@/lib/format";
import { useLogs } from "@/components/log-provider";

export default function Home() {
  const { entries } = useLogs();
  const total = entries.reduce((sum, item) => sum + item.expense, 0);
  return <div>
    <section className="relative overflow-hidden rounded-b-[36px] bg-[#315c49] px-5 pb-7 pt-12 text-white">
      <div className="absolute -right-10 -top-8 size-40 rounded-full border-[28px] border-white/5" />
      <p className="text-sm font-medium text-[#d8e5dc]">{fullKoreanDate()}</p>
      <div className="mt-2 flex items-end justify-between"><div><h1 className="text-[30px] font-extrabold tracking-[-.05em]">제주의 오늘,<br />어떤 하루였나요?</h1><p className="mt-3 text-sm text-[#d8e5dc]">천천히, 오래 남을 순간을 모아보세요.</p></div><span className="mb-1 text-5xl">🌿</span></div>
      <Link href="/new" className="mt-7 flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#f4a56f] font-bold text-[#473226] shadow-lg shadow-black/10"><Icon name="plus" className="size-5" />오늘 기록 추가</Link>
    </section>
    <section className="px-5 py-7">
      <div className="card-shadow flex items-center justify-between rounded-[22px] bg-[#fffdf9] p-5"><div><p className="text-sm text-[#777e78]">이번 달 총 지출</p><strong className="mt-1 block text-2xl tracking-tight">{currency(total)}</strong></div><Link href="/stats" className="flex size-11 items-center justify-center rounded-full bg-[#e6efe9] text-[#315c49]" aria-label="통계 보기"><Icon name="chart" className="size-5" /></Link></div>
      <div className="mb-4 mt-8 flex items-center justify-between"><h2 className="text-xl font-extrabold tracking-tight">최근 기록</h2><Link href="/timeline" className="flex items-center gap-1 text-sm font-bold text-[#527161]">전체보기 <Icon name="arrow" className="size-4 -rotate-90" /></Link></div>
      <div className="grid gap-5 sm:grid-cols-2">{entries.slice(0, 3).map((entry) => <EntryCard key={entry.id} entry={entry} compact />)}</div>
    </section>
  </div>;
}
