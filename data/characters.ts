/* ═════════ 캐릭터 데이터 — 여기만 고치면 됩니다 ═════════
   name   : 이름
   rank   : "도차사" | "사령" | "저승사자"
   cohort : 기수 (숫자면 "제3기"처럼 표시, 문자열이면 그대로 표시)
   quote  : 캐릭터를 상징하는 대사 한 줄 (비우면 빈 자리 표시)
   image  : 초상 이미지 경로. public/img/characters 에 넣고 "/img/characters/파일명.webp" 처럼 적기
            1:1 정사각형 권장. 비우면 빈 칸 표시
   link   : 초상을 눌렀을 때 이동할 주소
   suno   : Suno 곡 주소 또는 곡 ID
            (예: "https://suno.com/song/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx")
            ※ suno.com/s/… 형태의 짧은 공유 링크는 곡 페이지를 열어 긴 주소로 바꿔 넣어 주세요.
   ※ 아래 이름·기수·대사는 모두 예시입니다.
   ※ "전체" 탭에서는 페이지를 열 때마다 무작위 순서로, 계급 탭에서는 여기 적은 순서로 나옵니다. */
import type { Rank } from "@/lib/ranks";

export type Character = {
  name: string;
  rank: Rank;
  cohort?: number | string;
  quote?: string;
  image?: string;
  link?: string;
  suno?: string;
};

export const CHARACTERS: Character[] = [
  { name: "백령", rank: "도차사",   cohort: 1,   quote: "인생이란 게 참 덧없어서.",      image: "/img/characters/myaah_grain1.png", link: "https://t.melting.chat/50c7pd2?sh=NqVYW2hepm8YNtW5HV9B6A", suno: "https://suno.com/song/5e542e0d-d4d3-43ca-911c-d7ca280fdb26?sh=qp8Gp9bJVK7q54Qt" },
  { name: "화담", rank: "사령",     cohort: 14,  quote: "그리 노려보지 말게나. 귀엽지만 자꾸 놀리고 싶어지니.",              image: "/img/characters/luna_grain.png", link: "https://t.melting.chat/wzw1b4s?sh=hQnZagkXdoRyPBTgDFasBA", suno: "https://suno.com/s/YIoiWgmlKOP567UV" },
  { name: "종하", rank: "저승사자",     cohort: 80,  quote: "나의 성부, 나의 성자, 나의 성령. 나의 사랑님.",          image: "/img/characters/filter_jongha.png", link: "https://t.melting.chat/5lgo5ay?sh=xLvKsmKrgMnti7bK9FpJ4g#", suno: "https://suno.com/s/BKwC108mW12zvVFL" },
  { name: "한겨울", rank: "저승사자", cohort: 212, quote: "이번 달도 무급이면 나 그만둔다.",    image: "", link: "#", suno: "" },
  { name: "차온",   rank: "저승사자", cohort: 215, quote: "가실 길은 제가 압니다. 따라오세요.", image: "", link: "#", suno: "" },
  { name: "문새벽", rank: "저승사자", cohort: 219, quote: "",                                  image: "", link: "#", suno: "" },
];
