"use client";

import { useEffect, useRef } from "react";

/* 조직도. 상자 사이 세로 연결선은 '위 상자 아래 ~ 이 상자 위' 거리를 재서 그린다 */
export default function OrgChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const link = () => {
      const nodes = [...chart.querySelectorAll<HTMLElement>(".node")];
      nodes.forEach((n, i) => {
        if (!i) return;
        const prev = nodes[i - 1].getBoundingClientRect();
        const cur = n.getBoundingClientRect();
        n.style.setProperty("--up", `${Math.max(0, cur.top - prev.bottom - 1)}px`);
      });
    };
    link();
    window.addEventListener("resize", link);
    document.fonts?.ready.then(link);
    return () => window.removeEventListener("resize", link);
  }, []);

  return (
    <section className="sec" id="org" aria-labelledby="orgTitle">
      <div className="sec-head">
        <h2 id="orgTitle">조직도</h2>
        <span className="hj">組織圖</span>
        <span className="note">임직원은 모두 염라대왕의 정실과 첩의 자식이며, 계급은 관습에 의해 모계(母系)를 따라 배속한다.</span>
      </div>
      <div className="org">
        <div className="chart" role="figure" aria-label="주식회사 저승성 조직도" ref={chartRef}>
          <div className="node king">
            <div className="t">
              염라대왕 <small>閻羅大王</small>
            </div>
            <div className="s">대표, 저승성 통치</div>
          </div>
          <div className="arm none" />
          <div className="detail" />

          <div className="node r1 has-up">
            <Mark count={3} label="상급" />
            <div className="t">
              도차사 <small>都差使</small>
            </div>
            <div className="s">정실 부인의 자식</div>
          </div>
          <div className="arm" />
          <div className="detail">
            <p className="power">
              <b>‘신’에 준하는 권력.</b> 저승사자를 강제로 소환할 수 있다.
            </p>
            <span className="k">직속 지휘</span>
            <Chips items={["재정부", "인사 관리부", "보안부", "운영지원부"]} />
          </div>

          <div className="node r2 has-up">
            <Mark count={2} label="중급" />
            <div className="t">
              사령 <small>使令</small>
            </div>
            <div className="s">상급 첩의 자식</div>
          </div>
          <div className="arm" />
          <div className="detail">
            <p className="power">저승사자를 호출할 수 있다.</p>
          </div>

          <div className="node r3 has-up">
            <Mark count={1} label="하급" />
            <div className="t">
              저승사자 <small>使者</small>
            </div>
            <div className="s">하급 첩의 자식</div>
          </div>
          <div className="arm" />
          <div className="detail">
            <span className="k">근무 부서</span>
            <Chips items={["영혼 인도부", "명부 관리부", "특수 관리부"]} />
            <p className="power">
              도차사의 소환은 거부할 수 없다. <span className="warn">사령의 호출에 불응하면 무급 근무.</span>
            </p>
          </div>

          <div className="node union has-up">
            <div className="t">사노조</div>
            <div className="s">저승사자 노동조합</div>
          </div>
          <div className="arm dash" />
          <div className="detail">
            <p className="power">임금 인상과 처우 개선을 받는 대신, 인도 과정의 컴플레인을 줄이겠다는 안건으로 협상 중.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 계급장: 다이아몬드 개수로 계급을 읽는다 */
function Mark({ count, label }: { count: number; label: string }) {
  return (
    <span className="mark">
      <span className="dia" aria-hidden="true">
        {Array.from({ length: count }, (_, i) => (
          <i key={i} />
        ))}
      </span>
      {label}
    </span>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="chips">
      {items.map((t) => (
        <span className="chip" key={t}>
          {t}
        </span>
      ))}
    </div>
  );
}
