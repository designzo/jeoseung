/* 사내 게시판: 사노조 대자보와 포스트잇 두 장 */
export default function Board() {
  return (
    <section className="sec" id="board" aria-labelledby="boardTitle">
      <div className="board">
        <div className="copy">
          <div className="sec-head">
            <h2 id="boardTitle">사내 게시판</h2>
            <span className="hj">揭示板</span>
          </div>
          <p>사노조는 저승사자의 처우 개선을 위한 노동조합이다. 낮은 임금과 출생의 한계, 처우에 불만을 품고 가입한 이들이 대부분이다.</p>
          <p>그 이면에는 염라대왕 몰래 진행되는 비공식 활동에 관심을 품고 가입한 이들도 있다.</p>
        </div>
        <div className="poster">
          <article className="dazibo" aria-label="사노조 대자보">
            <h3>사노조 단체교섭 요구안</h3>
            <ol>
              <li>하나. 저승사자 임금 인상하라!</li>
              <li>하나. 출생으로 정해지는 처우, 개선하라!</li>
              <li>하나. 호출 불응 무급 근무, 철폐하라!</li>
            </ol>
            <p className="deal">요구가 받아들여지면, 우리는 인도 과정의 컴플레인을 줄이도록 노력하겠다.</p>
            <p className="sign">사노조 일동</p>
            <div className="stamp" aria-hidden="true">
              <b>未承認</b>인사 관리부
            </div>
          </article>
          <p className="slip a">간부들만 ‘신’이 되는 비록을 갖고 있다던데… 진짜임?</p>
          <p className="slip b">오늘 밤 모임, 늘 그 자리. 보안부 눈 조심!</p>
        </div>
      </div>
    </section>
  );
}
