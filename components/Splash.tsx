"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { KNOCK_SOUND } from "@/data/settings";
import { useGate } from "./GateProvider";

/* ═════════ 스플래시: 저승성의 문 ═════════
   두드리면(탭·클릭·Enter·Space)
     0초     : 누른 자리에 금빛 고리 두 번(통, 통) + 두드리는 소리 + 배경음악 시작 + 태슬 흔들림
     0.85초  : 질문이 사라지고 문 사이 이음매가 환해짐
     1.15초  : 태슬이 위로 쑥 사라짐
     1.2초   : 두 문짝이 양옆으로 열리기 시작
     3.35초  : 스플래시 제거 */

const QUESTION = "저승성의 문을 두드립니까?";
const HINT = "무음 모드를 풀어 즐겨 주세요.";
const FRAMES = 9; // 태슬 스프라이트 장면 수 (public/img/tassel-sprite.webp)
const FRAME_MS = 160; // 장면 하나의 길이 (원본 GIF와 같음)

type Phase = "idle" | "knocked" | "opening" | "gone";
type Ripple = { id: number; x: number; y: number; core: boolean; delay: number };

function SpeakerIcon() {
  return (
    <svg className="spk" viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2 6h3l4-3.2v10.4L5 10H2z" />
      <path className="w" d="M11.2 5.4a3.6 3.6 0 0 1 0 5.2M13 3.8a6 6 0 0 1 0 8.4" />
    </svg>
  );
}

/* 문짝 한 장. 안쪽 내용은 화면 너비의 두 배라서, 왼쪽·오른쪽 문짝이 같은 그림의 반쪽씩을 보여 준다 */
function Leaf({ side }: { side: "l" | "r" }) {
  const main = side === "l";
  return (
    <div className={`leaf ${side}`} aria-hidden={main ? undefined : true}>
      <div className="leaf-in">
        <div className="door">
          <p className="q" id={main ? "splashQ" : undefined}>
            {[...QUESTION].map((ch, i) => (
              <span key={i} style={{ "--i": i } as CSSProperties}>
                {ch}
              </span>
            ))}
          </p>
          <p className="hint">
            <SpeakerIcon />
            {HINT}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Splash() {
  const { bgmStartRef, markOpened } = useGate();
  const [phase, setPhase] = useState<Phase>("idle");
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [tasselUp, setTasselUp] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tasselRef = useRef<HTMLSpanElement>(null);
  const knockedRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timersRef = useRef<number[]>([]);
  const rippleId = useRef(0);

  const later = (fn: () => void, ms: number) => {
    timersRef.current.push(window.setTimeout(fn, ms));
  };

  useEffect(() => () => timersRef.current.forEach((t) => clearTimeout(t)), []);

  /* '통' 소리: 낮게 떨어지는 울림 + 나무를 치는 짧은 잡음 (효과음 파일 없이 브라우저가 직접 만든다) */
  function thud(at: number) {
    if (!KNOCK_SOUND) return;
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = (audioCtxRef.current ??= new AC());
      const t = ctx.currentTime + at;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(150, t);
      o.frequency.exponentialRampToValueAtTime(52, t + 0.13);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.55, t + 0.006);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.32);
      const len = Math.floor(ctx.sampleRate * 0.03);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let k = 0; k < len; k++) d[k] = (Math.random() * 2 - 1) * (1 - k / len);
      const n = ctx.createBufferSource();
      const bp = ctx.createBiquadFilter();
      const ng = ctx.createGain();
      n.buffer = buf;
      bp.type = "bandpass";
      bp.frequency.value = 850;
      bp.Q.value = 1.1;
      ng.gain.value = 0.22;
      n.connect(bp).connect(ng).connect(ctx.destination);
      n.start(t);
    } catch {
      /* 소리를 못 내도 문은 열린다 */
    }
  }

  /* 누른 자리에 금빛 고리 + 문짝이 살짝 울림 */
  function ring(x: number, y: number) {
    const items: Ripple[] = [
      { id: ++rippleId.current, x, y, core: true, delay: 0 },
      { id: ++rippleId.current, x, y, core: false, delay: 0 },
      { id: ++rippleId.current, x, y, core: false, delay: 90 },
    ];
    setRipples((list) => [...list, ...items]);
    rootRef.current?.querySelectorAll(".leaf").forEach((leaf) => {
      leaf.classList.remove("thud");
      void (leaf as HTMLElement).offsetWidth; // 애니메이션 다시 시작
      leaf.classList.add("thud");
    });
  }

  /* 태슬 한 번 흔들기: 0 → 8번 장면을 160ms씩 넘기고 다시 0번(정지)으로 */
  function swing() {
    const el = tasselRef.current;
    if (!el) return;
    for (let f = 1; f <= FRAMES; f++) {
      later(() => {
        el.style.backgroundPositionX = f >= FRAMES ? "0%" : `${(f / (FRAMES - 1)) * 100}%`;
      }, f * FRAME_MS);
    }
  }

  function open(reduce: boolean) {
    setPhase("opening");
    document.documentElement.classList.remove("veiled");
    later(markOpened, reduce ? 0 : 650);
    later(() => setPhase("gone"), reduce ? 600 : 2500);
  }

  function knock(x: number, y: number) {
    if (knockedRef.current) return;
    knockedRef.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    bgmStartRef.current?.(); // 사용자 동작 안에서 재생 → 자동재생 차단 해결
    thud(0);
    thud(0.26);
    setPhase("knocked");
    if (reduce) {
      later(() => open(true), 300);
      return;
    }
    ring(x, y);
    later(() => ring(x, y), 260);
    swing();
    later(() => open(false), 850); // 이음매가 빛나고 0.35초 뒤(탭 후 1.2초) 문짝이 움직이기 시작
    later(() => setTasselUp(true), 1150); // 흔들림 끝 무렵 위로 쑥
  }

  /* 키보드: Tab 없이 Enter나 Space만 눌러도 문을 두드린다 */
  useEffect(() => {
    if (phase !== "idle") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        knock(window.innerWidth / 2, window.innerHeight / 2);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (phase === "gone") return null;

  return (
    <div
      ref={rootRef}
      className={`splash${phase === "opening" ? " opening" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="splashQ"
    >
      <div className="veil" />
      <Leaf side="l" />
      <Leaf side="r" />
      <span className="seam" aria-hidden="true" />
      <div className={`tassel${tasselUp ? " up" : ""}`} aria-hidden="true">
        <span className="tassel-img" ref={tasselRef} />
      </div>
      <button
        type="button"
        className="knock"
        onClick={(e) => {
          const keyboard = e.detail === 0;
          knock(keyboard ? window.innerWidth / 2 : e.clientX, keyboard ? window.innerHeight / 2 : e.clientY);
        }}
      >
        <span className="sr">저승성의 문 두드리기</span>
      </button>
      {ripples.map((r) => (
        <span
          key={r.id}
          className={r.core ? "ripple core" : "ripple"}
          style={{ left: r.x, top: r.y, animationDelay: `${r.delay}ms` }}
          onAnimationEnd={() => setRipples((list) => list.filter((x) => x.id !== r.id))}
        />
      ))}
    </div>
  );
}
