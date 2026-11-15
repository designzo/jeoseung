/** Suno 곡 주소(또는 곡 ID)에서 임베드 플레이어 주소를 만든다. 못 찾으면 null */
export function sunoEmbedSrc(value?: string): string | null {
  if (!value) return null;
  const m = value.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  return m ? `https://suno.com/embed/${m[0]}` : null;
}

/** 기수 표시: 숫자면 "제3기", 문자열이면 그대로 */
export function cohortText(c?: number | string): string {
  if (c === "" || c == null) return "—";
  return typeof c === "number" ? `제${c}기` : c;
}
