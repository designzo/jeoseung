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
  { name: "화담", rank: "도차사",     cohort: 14,  quote: "그리 노려보지 말게나. 귀엽지만 자꾸 놀리고 싶어지니.",              image: "/img/characters/luna_grain.png", link: "https://t.melting.chat/wzw1b4s?sh=hQnZagkXdoRyPBTgDFasBA", suno: "https://suno.com/song/1bbb19e3-6c79-4c74-aa19-02c818340e20?sh=YIoiWgmlKOP567UV" },
  { name: "종하", rank: "저승사자",     cohort: 80,  quote: "나의 성부, 나의 성자, 나의 성령. 나의 사랑님.",          image: "/img/characters/filter_jongha.png", link: "https://t.melting.chat/5lgo5ay?sh=xLvKsmKrgMnti7bK9FpJ4g#", suno: "https://suno.com/song/19788358-bb32-4d5c-aed7-fd5256006f95?sh=BKwC108mW12zvVFL" },
  { name: "경원", rank: "저승사자", cohort: 37, quote: "남들은 태어나자마자 받은 걸, 나는 씨발 죽어라 일해서 따내야 하네. 좆같은 거.",    image: "/img/characters/beaksa_grain.png", link: "https://t.melting.chat/apo2jmm?sh=g7tQDgED001Kl3IZlb8mww", suno: "https://suno.com/song/efe4e1a4-8f82-4c6c-8a4f-31074a7d8555?sh=DRVuej8kpXxs3Mus" },
  { name: "화국",   rank: "저승사자", cohort: 3, quote: "당신의 사랑이 염라를 향해 날 탐한 거라면, 내가 염라에게 그 사랑을 줄게.", image: "/img/characters/minppu_grain.png", link: "https://t.melting.chat/cb555d5?sh=XVbFExCCUN-URs5OQG9Vcw", suno: "https://suno.com/song/0e850ea7-55fd-400e-b4db-2d4f9d6431a8?sh=rqwCpDSgilK3jtpW" },
  { name: "현오", rank: "도차사", cohort: 1, quote: "당신. 죽었어야 하는데 내가 실수했거든? ……다시 차에 치일래?",    image: "/img/characters/astro_grain2.png", link: "https://t.melting.chat/ly63tsl?sh=2v8xcBlPmK-IJWkCHnOaMA", suno: "https://suno.com/song/d2c4b654-2912-4c5d-8a59-6ddea810525a?sh=kQzXjt1zUNRIUhbJ" },
  { name: "자운", rank: "사령", cohort: 44, quote: "아비가 같다고 다 형제면, 저잣거리 개새끼들도 다 제 형제겠군요.",    image: "/img/characters/hyonddu_grain.png", link: "https://t.melting.chat/zdltaxs?sh=II0-DDd2qH5e6oGxxFZLLA", suno: "https://suno.com/song/be42f74c-5618-4ca2-80b4-f3476f2f22c9?sh=B1PEf21o3ghuEVf6" },
];
