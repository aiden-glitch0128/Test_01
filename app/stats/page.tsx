"use client";
import { PageHeader } from "@/components/page-header";
import { useLogs } from "@/components/log-provider";
import { categories } from "@/lib/types";
import { categoryStyle, currency } from "@/lib/format";

export default function StatsPage() {
  const { entries } = useLogs();
  const total = entries.reduce((sum, e) => sum + e.expense, 0);
  const expenses = categories.map((category) => ({ category, value: entries.filter((e) => e.category === category).reduce((sum, e) => sum + e.expense, 0) }));
  const counts = categories.map((category) => ({ category, count: entries.filter((e) => e.category === category).length }));
  const favorite = [...counts].sort((a, b) => b.count - a.count)[0];
  const max = Math.max(...expenses.map((item) => item.value), 1);
  return <><PageHeader title="이번 달 통계" subtitle="숫자로 다시 보는 제주 생활" /><div className="space-y-5 px-5 pb-6">
    <section className="card-shadow rounded-[26px] bg-[#315c49] p-6 text-white"><p className="text-sm text-[#d8e5dc]">9월 총 지출</p><strong className="mt-2 block text-3xl tracking-[-.03em]">{currency(total)}</strong><div className="mt-6 h-px bg-white/15" /><p className="mt-4 text-xs text-[#d8e5dc]">하루 평균 <b className="ml-1 text-white">{currency(Math.round(total / Math.max(entries.length, 1)))}</b></p></section>
    <div className="grid grid-cols-2 gap-3"><section className="card-shadow rounded-[22px] bg-white p-5"><span className="text-2xl">✏️</span><p className="mt-4 text-sm text-[#777e78]">쌓인 기록</p><strong className="mt-1 block text-2xl">{entries.length}개</strong></section><section className="card-shadow rounded-[22px] bg-white p-5"><span className="text-2xl">🏆</span><p className="mt-4 text-sm text-[#777e78]">가장 많은 기록</p><strong className="mt-1 block text-2xl">{favorite.category}</strong></section></div>
    <section className="card-shadow rounded-[26px] bg-white p-5"><h2 className="text-lg font-extrabold">카테고리별 지출</h2><div className="mt-5 space-y-5">{expenses.map(({ category, value }) => <div key={category}><div className="mb-2 flex items-center justify-between"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${categoryStyle[category]}`}>{category}</span><b className="text-sm">{currency(value)}</b></div><div className="h-2 overflow-hidden rounded-full bg-[#eeece6]"><div className="h-full rounded-full bg-[#e87843]" style={{ width: `${(value / max) * 100}%` }} /></div></div>)}</div></section>
  </div></>;
}
