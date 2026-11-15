/* ═════════ 배경음악 — 곡 4개를 순서대로 반복 ═════════
   mp3 파일은 public/audio 폴더에 넣고, src 에는 "/audio/파일명.mp3" 처럼 적습니다.
   title 은 데스크톱 헤더에 표시되는 곡 이름입니다. (모바일에서는 숨김) */
export type Track = { title: string; src: string };

export const PLAYLIST: Track[] = [
  { title: "명계개문", src: "/audio/명계개문.mp3" },
  { title: "주어진 자리", src: "/audio/주어진 자리.mp3" },
  { title: "저승성은 오늘도", src: "/audio/저승성은 오늘도.mp3" },
  { title: "협상", src: "/audio/협상.mp3" },
];
