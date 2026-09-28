import type { LogEntry } from "./types";

export const mockEntries: LogEntry[] = [
  { id: "1", date: "2026-09-28", place: "금오름", category: "장소", memo: "바람을 맞으며 천천히 오른 오후. 정상에서 본 들판이 오래 기억날 것 같다.", expense: 0, image: "/images/oreum.svg" },
  { id: "2", date: "2026-09-27", place: "동백수산", category: "음식", memo: "싱싱한 고등어회와 따뜻한 국. 제주에서 꼭 다시 먹고 싶은 한 끼.", expense: 48000, image: "/images/food.svg" },
  { id: "3", date: "2026-09-26", place: "사계의 시간", category: "카페", memo: "산방산이 보이는 창가에 앉아 책을 읽었다.", expense: 13500, image: "/images/cafe.svg" },
  { id: "4", date: "2026-09-25", place: "세화 오일장", category: "장보기", memo: "귤과 아침에 먹을 채소를 샀다.", expense: 27000 },
];
