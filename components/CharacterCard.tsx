import type { CSSProperties } from "react";
import type { Character } from "@/data/characters";
import { rankInfo } from "@/lib/ranks";
import { cohortText, sunoEmbedSrc } from "@/lib/suno";

/* 캐릭터 카드: 초상(1:1) → 이름 → 계급·기수 → 대사 → Suno 플레이어 */
export default function CharacterCard({ c, style, hidden }: { c: Character; style?: CSSProperties; hidden?: boolean }) {
  const info = rankInfo(c.rank);
  const src = sunoEmbedSrc(c.suno);
  const img = c.image ? (
    // 사용자가 넣는 이미지 경로를 그대로 쓰기 위해 next/image 대신 img 사용
    // eslint-disable-next-line @next/next/no-img-element
    <img src={c.image} alt={`${c.name} 초상`} loading="lazy" />
  ) : (
    <span className="ph">
      <b>초상</b>이미지 1 : 1
    </span>
  );

  return (
    <article className={`card ${info.level}`} data-rank={c.rank} style={style} hidden={hidden}>
      <div className="pwrap">
        {c.link ? (
          <a className="portrait" href={c.link} target="_blank" rel="noopener" aria-label={`${c.name} 페이지로 이동`}>
            {img}
          </a>
        ) : (
          <div className="portrait">{img}</div>
        )}
        <span className="seal" aria-hidden="true">
          {info.hanja}
        </span>
      </div>
      <div className="card-body">
        <h3>{c.name}</h3>
        <dl className="meta">
          <div>
            <dt>계급</dt>
            <dd>{c.rank}</dd>
          </div>
          <div>
            <dt>기수</dt>
            <dd>{cohortText(c.cohort)}</dd>
          </div>
        </dl>
        {c.quote ? <p className="quote">{c.quote}</p> : <p className="quote blank">대사 한 줄이 들어갈 자리</p>}
      </div>
      <div className="player">
        {src ? (
          <iframe src={src} title={`${c.name} 테마곡`} loading="lazy" allow="autoplay; encrypted-media" />
        ) : (
          <div className="ph">
            <b>Suno 플레이어 자리</b>곡 주소를 넣으면 이 자리에 플레이어가 나옵니다.
          </div>
        )}
      </div>
    </article>
  );
}
