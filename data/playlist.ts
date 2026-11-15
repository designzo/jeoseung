/* ═════════ 배경음악 — 곡 4개를 순서대로 반복 ═════════
   mp3 파일은 public/audio 폴더에 넣고, src 에는 "/audio/파일명.mp3" 처럼 적습니다.
   title 은 데스크톱 헤더에 표시되는 곡 이름입니다. (모바일에서는 숨김) */
export type Track = { title: string; src: string };

export const PLAYLIST: Track[] = [
  { title: "배경음악 1", src: "/audio/bgm-1.mp3" },
  { title: "배경음악 2", src: "/audio/bgm-2.mp3" },
  { title: "배경음악 3", src: "/audio/bgm-3.mp3" },
  { title: "배경음악 4", src: "/audio/bgm-4.mp3" },
];
