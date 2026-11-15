"use client";

import { useEffect, useState } from "react";
import { CHARACTERS } from "@/data/characters";
import { RANKS, type Rank } from "@/lib/ranks";
import CharacterCard from "./CharacterCard";

type Tab = "전체" | Rank;

/* 사원 명부
   - 전체 탭: 페이지를 열 때마다 무작위 순서 (같은 방문 안에서는 순서 유지)
   - 계급 탭: data/characters.ts 에 적은 순서
   카드는 한 번만 그리고 탭을 바꿀 때는 CSS order 와 hidden 만 바꾼다 → Suno 플레이어가 다시 로딩되지 않음 */
export default function Staff() {
  const [tab, setTab] = useState<Tab>("전체");
  const [shuffled, setShuffled] = useState<number[]>(() => CHARACTERS.map((_, i) => i));

  useEffect(() => {
    const order = CHARACTERS.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    setShuffled(order); // 서버 화면과 어긋나지 않도록 섞기는 브라우저에서만
  }, []);

  const tabs: { key: Tab; count: number }[] = [
    { key: "전체", count: CHARACTERS.length },
    ...RANKS.map((r) => ({ key: r.key, count: CHARACTERS.filter((c) => c.rank === r.key).length })),
  ];
  const visible = (rank: Rank) => tab === "전체" || rank === tab;
  const shownCount = CHARACTERS.filter((c) => visible(c.rank)).length;

  return (
    <section className="sec" id="staff" aria-labelledby="staffTitle">
      <div className="staff-head">
        <div>
          <div className="sec-head">
            <h2 id="staffTitle">사원 명부</h2>
            <span className="hj">社員名簿</span>
          </div>
          <p>초상을 누르면 해당 인물의 페이지로 이동한다.</p>
        </div>
        <div className="filter" role="group" aria-label="계급으로 보기">
          {tabs.map(({ key, count }) => (
            <button key={key} type="button" aria-pressed={tab === key} onClick={() => setTab(key)}>
              {key}
              <span>{count}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="staff">
        {CHARACTERS.map((c, i) => (
          <CharacterCard
            key={i}
            c={c}
            hidden={!visible(c.rank)}
            style={{ order: tab === "전체" ? shuffled.indexOf(i) : i }}
          />
        ))}
      </div>
      {shownCount === 0 && (
        <p className="empty" style={{ display: "block" }}>
          이 계급에 등록된 사원이 없다.
        </p>
      )}
    </section>
  );
}
