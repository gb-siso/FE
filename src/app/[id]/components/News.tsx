import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useRef, useState } from 'react';

const News = () => {
  const [slides, setSlides] = useState(
    Array.from({ length: 10 }).map((_, index) => `${index + 1}`)
  );

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
          {slides.map((slideContent, index) => (
            <SwiperSlide key={slideContent} virtualIndex={index}>
              <Img />
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

const Img = styled.div`
  width: 100px;
  height: 100px;
  border: 1px solid blue;
  @media (min-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;
