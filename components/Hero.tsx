import Emblem from "./Emblem";

/* 표지: 저승성 엠블럼 + 세로 제목 */
export default function Hero() {
  return (
    <section className="frontis" aria-label="표지">
      <figure className="map-fig">
        <Emblem />
        <figcaption>
          한국의 민속신앙과 무속, 전통 설화로 이루어진 저승. 가운데에 저승성이 있고 서천꽃밭이 성벽처럼 그 둘레를
          감싼다. 꽃밭 바깥은 각 구역의 대왕이 따로 다스리는 땅이다.
        </figcaption>
      </figure>

      <div className="title-col">
        <h1>冥府錄</h1>
        <p className="t-sub">주식회사 저승성 사원 명부</p>
        <p className="t-intro">이승과 저승이 함께 있는 세계.</p>
        <p className="t-intro">저승 한가운데, 염라대왕이 다스리는 저승성이 있다.</p>
      </div>
    </section>
  );
}
