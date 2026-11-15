"use client";

import { useEffect, useState } from "react";
import BgmPlayer from "./BgmPlayer";

const NAV = [
  { id: "org", label: "조직도" },
  { id: "board", label: "사내 게시판" },
  { id: "staff", label: "사원 명부" },
];

/* 상단 내비: 모바일은 [플레이어 ……… 메뉴], 데스크톱은 [로고 | 플레이어 ……… 메뉴]
   지금 보고 있는 섹션의 메뉴에 밑줄을 친다 */
export default function SiteHeader() {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="top">
      <div className="wrap">
        <a className="brand" href="#">
          <svg aria-hidden="true">
            <use href="#gat" />
          </svg>
          주식회사 저승성
        </a>
        <BgmPlayer />
        <nav aria-label="주요 메뉴">
          {NAV.map(({ id, label }) => (
            <a key={id} href={`#${id}`} aria-current={current === id ? "true" : undefined}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
