import type { Category } from "./types";
export const currency = (value: number) => `${value.toLocaleString("ko-KR")}원`;
export const categoryStyle: Record<Category, string> = {
  장소: "bg-[#e2eee8] text-[#35634f]", 음식: "bg-[#f9e7dd] text-[#a94f2d]", 카페: "bg-[#eee6da] text-[#755b3b]", 장보기: "bg-[#e9e7f3] text-[#655c8e]", 기타: "bg-[#e8e8e5] text-[#5f655f]",
};
export const fullKoreanDate = (date = new Date()) => new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", weekday: "long" }).format(date);
