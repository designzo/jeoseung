/* 갓 모양 로고. <use href="#gat" /> 로 어디서나 불러 쓴다 */
export default function GatSymbol() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <symbol id="gat" viewBox="0 0 34 22">
        <ellipse cx="17" cy="16.5" rx="15.5" ry="3.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10.5 15.6 V6.5 Q10.5 2.5 17 2.5 Q23.5 2.5 23.5 6.5 V15.6" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </symbol>
    </svg>
  );
}
