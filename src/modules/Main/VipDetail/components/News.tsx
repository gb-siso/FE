import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useRef, useState } from 'react';
const MOCK = [
  '/test/down1.jpeg',
  '/test/down2.jpeg',
  '/test/down3.png',
  '/test/down4.png',
  '/test/down1.jpeg',
  '/test/down2.jpeg',
  '/test/down3.png',
  '/test/down4.png',
  '/test/down1.jpeg',
  '/test/down2.jpeg',
  '/test/down3.png',
  '/test/down4.png'
];

const News: React.FC<any> = ({ news }) => {
  const [slides, setSlides] = useState(MOCK);

  const removeHtmlEntities = (text: string) => {
    return text.replace(/&#[0-9]+;/g, '');
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <NewsTitle>🧾 News</NewsTitle>
      </TitleWrapper>
      <NewsBox>
        {JSON.stringify(news) === '{}' && (
          <Empty>의원님의 최신 뉴스가 존재하지 않습니다!</Empty>
        )}
        {news &&
          news.row?.map((item: any, idx: any) => {
            const { COMP_MAIN_TITLE: title } = item;
            return (
              <>
                <Nes
                  key={idx}
                  onClick={() => {
                    window.open(item.LINK_URL, '_blank');
                  }}
                >
                  {removeHtmlEntities(title)}
                </Nes>
              </>
            );
          })}
      </NewsBox>
      {/* <NewsWrap>
        <Swiper
          modules={[Virtual, Navigation, Pagination]}
          slidesPerView={3}
          centeredSlides={true}
          spaceBetween={30}
          initialSlide={1}
          pagination={{
            type: 'bullets',
            clickable: true
          }}
          virtual
        >
          {slides.map((item, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <Img src={item} alt="hi" />
            </SwiperSlide>
          ))}
        </Swiper>
      </NewsWrap> */}
    </Wrapper>
  );
};

export default News;
const Empty = styled.div`
  padding: 1rem;
  padding-left: 0.5rem;
`;
const Nes = styled.div`
  font-size: 18px; // 글자 크기
  font-weight: bold; // 글자 두께
  color: #333; // 글자 색
  text-decoration: none; // 링크 밑줄 제거
  padding: 10px 15px; // 패딩
  background-color: #f4f4f4; // 배경색
  border-radius: 8px; // 테두리 둥글게
  transition: background-color 0.3s ease; // 배경색 전환 효과
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0; // 마우스 올리면 배경색 변화
  }
`;
const NewsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Wrapper = styled.div`
  width: 95%;
  box-sizing: border-box;
  padding: 0 1rem;
  padding-bottom: 2rem;
  background-color: #fff;
  margin: 0 auto;
  margin-top: 1rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid #ddd;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
`;

const NewsTitle = styled.p`
  color: #080a0b;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 20px;
`;

const NewsWrap = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
  & > div {
    display: flex;
    width: 100%;
    overflow: visible;
  }
  & > div > div.swiper-pagination {
    bottom: -40px;
  }
`;

const Img = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  @media (min-width: 768px) {
    width: 155px;
    height: 155px;
  }
`;
