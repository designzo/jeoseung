"use client";

import { createContext, useCallback, useContext, useRef, useState, type RefObject } from "react";

/* 스플래시(저승성의 문)와 나머지 화면을 잇는 공용 상태
   - bgmStartRef : 헤더 플레이어가 등록하는 '재생 시작' 함수. 스플래시를 두드리는 순간 바로 부른다
                   (사용자 동작 안에서 재생해야 브라우저 자동재생 차단에 걸리지 않음)
   - opened      : 문이 열렸는지. 히어로 엠블럼은 이 값이 true가 된 뒤에 그려지기 시작한다 */
type Gate = {
  opened: boolean;
  markOpened: () => void;
  bgmStartRef: RefObject<(() => void) | null>;
};

const GateContext = createContext<Gate | null>(null);

export function GateProvider({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false);
  const bgmStartRef = useRef<(() => void) | null>(null);
  const markOpened = useCallback(() => setOpened(true), []);
  return <GateContext.Provider value={{ opened, markOpened, bgmStartRef }}>{children}</GateContext.Provider>;
}

export function useGate(): Gate {
  const gate = useContext(GateContext);
  if (!gate) throw new Error("useGate는 GateProvider 안에서만 쓸 수 있습니다.");
  return gate;
}
