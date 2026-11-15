import type { Metadata, Viewport } from "next";
import { Gowun_Batang, Nanum_Brush_Script, Noto_Serif_KR, Song_Myung } from "next/font/google";
import "./globals.css";

/* 한글 글꼴은 글자 수가 많아 미리 받지 않고(preload:false), 필요한 글자 조각만 내려받게 둔다 */
const display = Song_Myung({ weight: "400", variable: "--font-display", display: "swap" }); // 이 글꼴은 미리받기 옵션이 없음
const text = Gowun_Batang({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-text", display: "swap", preload: false });
const hanja = Noto_Serif_KR({ weight: ["500", "700"], subsets: ["latin"], variable: "--font-hanja", display: "swap", preload: false });
const hand = Nanum_Brush_Script({ weight: "400", subsets: ["latin"], variable: "--font-hand", display: "swap", preload: false });

export const metadata: Metadata = {
  title: "冥府錄 — 주식회사 저승성",
  description: "이승과 저승이 함께 있는 세계, 염라대왕이 다스리는 주식회사 저승성의 조직도와 사원 명부",
};

export const viewport: Viewport = {
  themeColor: "#131A2C",
};

/* 자바스크립트가 꺼져 있으면 스플래시가 영영 안 닫히므로 바로 본문을 보여 준다 */
const NO_JS_STYLE =
  "<style>html.veiled{overflow:auto}.splash{display:none}html.veiled .frontis{transform:none;opacity:1}</style>";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      className={`veiled ${display.variable} ${text.variable} ${hanja.variable} ${hand.variable}`}
      suppressHydrationWarning
    >
      <head>
        <noscript dangerouslySetInnerHTML={{ __html: NO_JS_STYLE }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
