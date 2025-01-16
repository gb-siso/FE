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

const News = () => {
  const [slides, setSlides] = useState(MOCK);

  return (
    <Wrapper>
      <TitleWrapper>
        <NewsTitle>🧾 News</NewsTitle>
      </TitleWrapper>
      <NewsWrap>
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
      </NewsWrap>
    </Wrapper>
  );
};

export default News;

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
  gap: 18px;
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
  padding-bottom: 40px;
  & > div {
    display: flex;
    width: 100%;
    overflow: visible;
  }
  & > div > div.swiper-pagination {
    bottom: -55px;
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
