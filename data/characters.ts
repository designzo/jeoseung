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
  { name: "백무현", rank: "도차사",   cohort: 3,   quote: "부르면 와. 이유는 묻지 말고.",      image: "", link: "#", suno: "" },
  { name: "서이연", rank: "사령",     cohort: 41,  quote: "호출은 한 번만 한다.",              image: "", link: "#", suno: "" },
  { name: "강도윤", rank: "사령",     cohort: 44,  quote: "명부에 없는 이름은 없어.",          image: "", link: "#", suno: "" },
  { name: "한겨울", rank: "저승사자", cohort: 212, quote: "이번 달도 무급이면 나 그만둔다.",    image: "", link: "#", suno: "" },
  { name: "차온",   rank: "저승사자", cohort: 215, quote: "가실 길은 제가 압니다. 따라오세요.", image: "", link: "#", suno: "" },
  { name: "문새벽", rank: "저승사자", cohort: 219, quote: "",                                  image: "", link: "#", suno: "" },
];
