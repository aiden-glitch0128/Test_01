export const categories = ["장소", "음식", "카페", "장보기", "기타"] as const;
export type Category = (typeof categories)[number];
export type LogEntry = { id: string; date: string; place: string; category: Category; memo: string; expense: number; image?: string };
