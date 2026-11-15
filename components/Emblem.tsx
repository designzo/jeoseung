"use client";

import { useEffect, useRef } from "react";
import { useGate } from "./GateProvider";

/* ═════════ 저승성 엠블럼 ═════════
   테두리 → 아랫단 → 기둥 → 가운데 단 → 꼭대기 → 문 → 해와 달 순서로 금니 획을 긋듯 그린다.
   각 선의 data-d(시작 ms), data-t(그리는 시간 ms). 가운데 대문은 data-fill 시점에 금빛으로 채워진다.
   스플래시 문이 열린 뒤, 엠블럼이 화면에 보일 때 한 번만 재생. */

type Part = { el: SVGGeometryElement; len: number };

export default function Emblem() {
  const { opened } = useGate();
  const svgRef = useRef<SVGSVGElement>(null);
  const parts = useRef<Part[] | null>(null);
  const ran = useRef(false);

  /* 처음에는 모든 선을 숨겨 둔다 (문이 닫혀 있는 동안) */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || ran.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !Element.prototype.animate) return;
    parts.current = [...svg.querySelectorAll<SVGGeometryElement>("[data-d]")].map((el) => {
      const len = el.getTotalLength() + 1;
      el.style.strokeDasharray = `${len}`;
      el.style.strokeDashoffset = `${len}`;
      if (el.dataset.fill) el.style.fillOpacity = "0";
      return { el, len };
    });
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!opened || !svg || !parts.current || ran.current) return;
    const run = () => {
      if (ran.current) return;
      ran.current = true;
      const ease = "cubic-bezier(.55,.05,.3,1)";
      parts.current!.forEach(({ el, len }) => {
        const a = el.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
          duration: Number(el.dataset.t),
          delay: Number(el.dataset.d) + 150,
          easing: ease,
        });
        a.onfinish = () => {
          el.style.strokeDasharray = "";
          el.style.strokeDashoffset = "";
        };
        if (el.dataset.fill) {
          const f = el.animate([{ fillOpacity: 0 }, { fillOpacity: 1 }], {
            duration: 700,
            delay: Number(el.dataset.fill) + 150,
            easing: "ease-out",
          });
          f.onfinish = () => {
            el.style.fillOpacity = "";
          };
        }
      });
    };
    if (!("IntersectionObserver" in window)) return run();
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(svg);
    return () => io.disconnect();
  }, [opened]);

  return (
    <svg ref={svgRef} className="emblem" viewBox="0 0 209.89 210.04" role="img" aria-labelledby="emTitle">
      <title id="emTitle">저승성: 둥근 테두리 안에 아치가 층층이 쌓인 성, 그 위로 해와 달</title>
      {/* 테두리: 바깥 원 → 안쪽 원 (둘 다 아래에서 시작해 왼쪽으로 돈다) */}
      <path className="ring" data-d="0" data-t="1400" d="M104.8,204.79c-26.71,0-51.83-10.4-70.71-29.29-18.89-18.88-29.29-44-29.29-70.71s10.4-51.82,29.29-70.71C52.97,15.19,78.09,4.79,104.8,4.79s51.82,10.4,70.71,29.29c18.89,18.89,29.29,44,29.29,70.71s-10.4,51.83-29.29,70.71C156.62,194.39,131.51,204.79,104.8,204.79Z" />
      <circle className="ring" data-d="220" data-t="1400" cx="104.8" cy="104.79" r="87.5" transform="rotate(90 104.8 104.79)" />
      {/* 아랫단 아치 다섯: 가운데부터 바깥으로 */}
      <path className="w4 arch" data-d="1200" data-t="900" d="M29.8,149.87v-21.09c0-5.18,4.19-9.38,9.37-9.38h11.25c5.18,0,9.38,4.2,9.38,9.38v14.72" />
      <path className="w4 arch" data-d="1050" data-t="900" d="M59.8,179.85v-36.25c0-5.17,4.19-9.37,9.37-9.37h11.25c5.18,0,9.38,4.2,9.38,9.37v48.12" />
      <path className="w4 arch" data-d="900" data-t="900" d="M89.8,143.5v-14.72c0-5.18,4.19-9.38,9.37-9.38h11.25c5.18,0,9.38,4.2,9.38,9.38v14.72" />
      <path className="w4 arch" data-d="1050" data-t="900" d="M119.8,191.72v-48.12c0-5.17,4.19-9.37,9.37-9.37h11.25c5.18,0,9.38,4.2,9.38,9.37v37.38" />
      <path className="w4 arch" data-d="1200" data-t="900" d="M149.8,143.5v-14.72c0-5.18,4.19-9.38,9.37-9.38h11.25c5.18,0,9.38,4.2,9.38,9.38v21.11" />
      {/* 기둥: 아래에서 위로 자란다 */}
      <line className="w5 arch" data-d="1800" data-t="260" x1="59.8" y1="117.38" x2="59.8" y2="110.71" />
      <line className="w5 arch" data-d="1800" data-t="260" x1="89.8" y1="117.38" x2="89.8" y2="110.71" />
      <line className="w5 arch" data-d="1800" data-t="260" x1="119.8" y1="117.38" x2="119.8" y2="110.71" />
      <line className="w5 arch" data-d="1800" data-t="260" x1="149.8" y1="117.38" x2="149.8" y2="110.71" />
      {/* 가운데 단 아치 둘 */}
      <path className="w5 arch" data-d="2000" data-t="700" d="M59.8,108.69v-9.57c0-5.17,4.19-9.37,9.37-9.37h11.25c5.18,0,9.38,4.2,9.38,9.37v9.57" />
      <path className="w5 arch" data-d="2000" data-t="700" d="M119.8,108.69v-9.57c0-5.17,4.19-9.37,9.37-9.37h11.25c5.18,0,9.38,4.2,9.38,9.37v9.57" />
      <line className="w6 arch" data-d="2550" data-t="220" x1="89.8" y1="88.69" x2="89.8" y2="82.03" />
      <line className="w6 arch" data-d="2550" data-t="220" x1="119.8" y1="88.69" x2="119.8" y2="82.03" />
      {/* 꼭대기 아치 */}
      <path className="w6 arch" data-d="2700" data-t="700" d="M89.8,79.12v-11.34c0-5.18,4.19-9.37,9.37-9.37h11.25c5.18,0,9.38,4.19,9.38,9.37v11.34" />
      {/* 문 */}
      <path className="w6 door" data-d="3150" data-t="500" d="M100.8,128.14h8c1.24,0,2.25,1,2.25,2.25v6.34h-12.5v-6.34C98.55,129.14,99.56,128.14,100.8,128.14Z" />
      <path className="w6 door" data-d="3250" data-t="500" d="M40.8,128.14h8c1.24,0,2.25,1,2.25,2.25v6.34h-12.5v-6.34C38.55,129.14,39.56,128.14,40.8,128.14Z" />
      <path className="w6 door" data-d="3250" data-t="500" d="M160.8,128.14h8c1.24,0,2.25,1,2.25,2.25v6.34h-12.5v-6.34C158.55,129.14,159.56,128.14,160.8,128.14Z" />
      <path className="w6 door" data-d="3350" data-t="500" d="M70.8,98.68h8c1.24,0,2.25,1.01,2.25,2.25v13.12h-12.5v-13.12C68.55,99.69,69.56,98.68,70.8,98.68Z" />
      <path className="w6 door" data-d="3350" data-t="500" d="M130.8,98.68h8c1.24,0,2.25,1.01,2.25,2.25v13.12h-12.5v-13.12C128.55,99.69,129.56,98.68,130.8,98.68Z" />
      {/* 가운데 대문: 윤곽을 그은 뒤 금빛으로 채워진다 */}
      <path className="w6 gate" data-d="3450" data-t="600" data-fill="4000" d="M100.8,67.57h8c1.24,0,2.25,1.01,2.25,2.25v40.89h-12.5v-40.89C98.55,68.58,99.56,67.57,100.8,67.57Z" />
      {/* 하늘: 왼쪽 달, 오른쪽 해 (원본 위치에서 원 중심 쪽으로 3단위씩 당김) */}
      <g transform="translate(2.63 1.45)">
        <path className="w8 sky" data-d="3700" data-t="650" d="M50.75,67.63c.92,1.3,1.43,2.91,1.33,4.63-.24,4.02-3.69,7.09-7.71,6.85-1.37-.08-2.63-.53-3.69-1.26" />
        <path className="w8 sky" data-d="3700" data-t="650" d="M38.15,74.84c-.47-1.04-.7-2.21-.63-3.43.23-4.02,3.68-7.09,7.7-6.86,1.33.08,2.56.51,3.6,1.2" />
      </g>
      <g transform="translate(-2.62 1.46)">
        <circle className="w7 sky" data-d="3800" data-t="700" cx="163.76" cy="71.83" r="7.29" transform="rotate(-90 163.76 71.83)" />
      </g>
    </svg>
  );
}
