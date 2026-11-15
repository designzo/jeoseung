"use client";

import { useEffect, useRef, useState } from "react";
import { PLAYLIST } from "@/data/playlist";
import { BGM_VOLUME } from "@/data/settings";
import { useGate } from "./GateProvider";

/* ═════════ 헤더 배경음악 플레이어 ═════════
   - 스플래시에서 문을 두드리면 1번 곡부터 재생(소리는 서서히 커짐)
   - 곡이 끝나면 다음 곡, 4번째 다음은 다시 1번
   - 파일이 없거나 깨진 곡은 건너뛰고, 전부 실패하면 '음원을 불러오지 못함' 표시
   - 캐릭터 카드의 Suno 플레이어를 누르면 배경음악은 잠시 멈춤 */

type State = "idle" | "on" | "paused" | "off";
type Controls = { toggle: () => void; next: () => void };

export default function BgmPlayer() {
  const { bgmStartRef } = useGate();
  const audioRef = useRef<HTMLAudioElement>(null);
  const controls = useRef<Controls | null>(null);
  const [state, setState] = useState<State>("idle");
  const [title, setTitle] = useState("배경음악");

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || PLAYLIST.length === 0) return;
    let i = 0;
    let fails = 0;
    let started = false;
    let switching = false;
    let current: State = "idle";
    let fadeTimer = 0;
    const set = (s: State) => {
      current = s;
      setState(s);
    };

    const load = (n: number) => {
      i = (n + PLAYLIST.length) % PLAYLIST.length;
      switching = true;
      audio.src = PLAYLIST[i].src;
      setTitle(PLAYLIST[i].title);
      if ("mediaSession" in navigator && "MediaMetadata" in window) {
        navigator.mediaSession.metadata = new MediaMetadata({ title: PLAYLIST[i].title, artist: "주식회사 저승성" });
      }
    };
    const play = () => {
      audio.play()?.catch(() => {});
    };
    const fadeIn = () => {
      let v = 0;
      try {
        audio.volume = 0;
      } catch {}
      window.clearInterval(fadeTimer);
      fadeTimer = window.setInterval(() => {
        v = Math.min(1, v + 0.04);
        try {
          audio.volume = v * BGM_VOLUME; // iOS는 음량 조절을 무시한다
        } catch {}
        if (v >= 1) window.clearInterval(fadeTimer);
      }, 80);
    };
    const start = () => {
      if (started) return;
      started = true;
      load(0);
      fadeIn();
      play();
    };

    const onPlaying = () => {
      fails = 0;
      switching = false;
      set("on");
    };
    const onPause = () => {
      if (audio.ended || current === "off") return;
      window.setTimeout(() => {
        if (audio.paused && !switching) set("paused");
      }, 150);
    };
    const onEnded = () => {
      load(i + 1); // 마지막 곡 다음은 첫 곡
      play();
    };
    const onError = () => {
      switching = false;
      if (++fails >= PLAYLIST.length) {
        set("off");
        setTitle("음원을 불러오지 못함");
        return;
      }
      load(i + 1); // 파일이 없거나 깨지면 다음 곡으로
      play();
    };
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    const next = () => {
      if (!started) return start();
      fails = 0;
      load(i + 1);
      play();
    };
    controls.current = {
      toggle: () => {
        if (!started) return start();
        if (current === "off") {
          fails = 0;
          load(i);
          return play();
        }
        if (audio.paused) play();
        else {
          switching = false;
          audio.pause();
        }
      },
      next,
    };
    bgmStartRef.current = start;

    if ("mediaSession" in navigator) {
      try {
        navigator.mediaSession.setActionHandler("nexttrack", next);
      } catch {}
    }

    /* 캐릭터 카드의 Suno 플레이어(iframe)를 누르면 창의 포커스가 iframe으로 넘어간다 → 배경음악 일시정지 */
    const onBlur = () =>
      window.setTimeout(() => {
        const el = document.activeElement;
        if (el && el.tagName === "IFRAME" && el.closest(".player") && !audio.paused) audio.pause();
      }, 0);
    window.addEventListener("blur", onBlur);

    return () => {
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      window.removeEventListener("blur", onBlur);
      window.clearInterval(fadeTimer);
      bgmStartRef.current = null;
    };
  }, [bgmStartRef]);

  const on = state === "on";
  return (
    <div className="bgm" data-state={state} role="group" aria-label="배경음악">
      <button
        type="button"
        className="bgm-btn bgm-play"
        aria-label={on ? "배경음악 일시정지" : "배경음악 재생"}
        aria-pressed={on}
        onClick={() => controls.current?.toggle()}
      >
        <svg className="i-play" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2.5 1.2 10.5 6 2.5 10.8Z" />
        </svg>
        <svg className="i-pause" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M2.2 1.5h2.8v9H2.2zM7 1.5h2.8v9H7z" />
        </svg>
      </button>
      <button type="button" className="bgm-btn bgm-next" aria-label="다음 곡" onClick={() => controls.current?.next()}>
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="M1.5 1.6 7.3 6 1.5 10.4ZM8.2 1.6h2.3v8.8H8.2z" />
        </svg>
      </button>
      <span className="eq" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="bgm-title" aria-live="polite">
        {title}
      </span>
      <audio ref={audioRef} preload="none" />
    </div>
  );
}
