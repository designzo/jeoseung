export type Rank = "도차사" | "사령" | "저승사자";

/** 계급 순서, 도장에 찍히는 한자, 색 단계(r1 금 / r2 적 / r3 은) */
export const RANKS: { key: Rank; hanja: string; level: "r1" | "r2" | "r3" }[] = [
  { key: "도차사",   hanja: "都差使", level: "r1" },
  { key: "사령",     hanja: "使令",   level: "r2" },
  { key: "저승사자", hanja: "使者",   level: "r3" },
];

export const rankInfo = (rank: Rank) => RANKS.find((r) => r.key === rank) ?? RANKS[2];
