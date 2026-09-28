"use client";
import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { Icon } from "@/components/icons";
import { categories, type Category } from "@/lib/types";
import { useLogs } from "@/components/log-provider";

const today = new Date().toISOString().slice(0, 10);
export default function NewEntryPage() {
  const router = useRouter(); const { addEntry } = useLogs(); const fileRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState<Category>("장소"); const [fileName, setFileName] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); addEntry({ id: crypto.randomUUID(), date: String(data.get("date")), place: String(data.get("place")), category, memo: String(data.get("memo")), expense: Number(data.get("expense")) || 0 }); router.push("/"); }
  const field = "mt-2 min-h-14 w-full rounded-2xl border border-[#ddd9d0] bg-white px-4 outline-none transition focus:border-[#527161] focus:ring-2 focus:ring-[#527161]/10";
  return <><PageHeader title="오늘의 기록" subtitle="제주의 한 순간을 남겨보세요" back /><form onSubmit={submit} className="space-y-6 px-5 pb-6">
    <label className="block text-sm font-bold">날짜<input required name="date" type="date" defaultValue={today} className={field} /></label>
    <label className="block text-sm font-bold">장소명<input required name="place" placeholder="어디에 다녀왔나요?" className={field} /></label>
    <fieldset><legend className="text-sm font-bold">카테고리</legend><div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`min-h-11 shrink-0 rounded-full px-5 text-sm font-bold transition ${category === item ? "bg-[#315c49] text-white" : "border border-[#ddd9d0] bg-white text-[#68716b]"}`}>{item}</button>)}</div></fieldset>
    <label className="block text-sm font-bold">메모<textarea required name="memo" rows={4} placeholder="오늘의 기분과 순간을 자유롭게 적어보세요." className={`${field} resize-none py-4 leading-6`} /></label>
    <label className="block text-sm font-bold">지출 금액<div className="relative"><input name="expense" type="number" min="0" inputMode="numeric" placeholder="0" className={`${field} pr-12 text-right`} /><span className="absolute right-4 top-1/2 translate-y-[-40%] text-sm text-[#777e78]">원</span></div></label>
    <div><p className="text-sm font-bold">사진</p><input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")} /><button type="button" onClick={() => fileRef.current?.click()} className="mt-2 flex min-h-32 w-full flex-col items-center justify-center rounded-[22px] border border-dashed border-[#b9c4bc] bg-[#f1f4f0] text-[#527161]"><span className="flex size-11 items-center justify-center rounded-full bg-white"><Icon name="image" className="size-5" /></span><b className="mt-2 text-sm">{fileName || "사진 선택하기"}</b><span className="mt-1 text-xs text-[#858b86]">앨범에서 소중한 순간을 골라주세요</span></button></div>
    <button type="submit" className="min-h-14 w-full rounded-2xl bg-[#315c49] text-base font-bold text-white shadow-lg shadow-[#315c49]/15">기록 저장하기</button>
  </form></>;
}
