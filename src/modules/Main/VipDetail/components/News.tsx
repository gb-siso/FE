import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useEffect, useRef, useState } from 'react';
import { getVipNews } from '../../fetch';
import { useParams } from 'next/navigation';
import { useAtomValue, useSetAtom } from 'jotai';
import { getVipNewsAtom, vipNewsAtom } from '../../atom';
import useHandler from '@/app/hooks/useHandler';
import Spinner from '@/app/_components/Spinner';
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

const News: React.FC<any> = () => {
  const params = useParams();
  const [isMore, setIsMore] = useState(false);

  // const [slides, setSlides] = useState(MOCK);

  const findNews = useSetAtom(getVipNewsAtom);
  const news = useAtomValue(vipNewsAtom);

  const removeHtmlEntities = (text: string) => {
    return text.replace(/&#[0-9]+;/g, '');
  };

  const { isLoading, handler: initHandler } = useHandler(async () => {
    const name = decodeURIComponent(params?.vipId as string);
    await findNews({ name });
  });

  useEffect(() => {
    initHandler();
  }, []);
  return (
    <Wrapper>
      <TitleWrapper>
        <NewsTitle>🧾 시소 news</NewsTitle>
        <More onClick={() => setIsMore((prev) => !prev)}>
          {JSON.stringify(news) === '{}' || news?.row?.length < 4
            ? ''
            : isMore
              ? '닫기'
              : '더보기'}
        </More>
      </TitleWrapper>
      {isLoading && <Spinner title={'뉴스 데이터를 불러오는 중입니다:)'} />}
      {!isLoading && (
        <NewsBox>
          {!news ||
            (news?.row.length === 0 && (
              <Empty>의원님의 최신 뉴스가 존재하지 않습니다!</Empty>
            ))}
          {news &&
            news.row
              ?.slice(0, isMore ? undefined : 3)
              .map((item: any, idx: any) => {
                const { COMP_MAIN_TITLE: title, REG_DATE: date } = item;

                return (
                  <Nes
                    key={idx}
                    onClick={() => {
                      window.open(item.LINK_URL, '_blank');
                    }}
                  >
                    <ContentWrap>
                      <Li />
                      <Content>"{removeHtmlEntities(title)}"</Content>
                    </ContentWrap>
                    <Date>{date.split(' ')[0]}</Date>
                  </Nes>
                );
              })}
        </NewsBox>
      )}
    </Wrapper>
  );
};

export default News;
const Empty = styled.div`
  padding: 1rem;
  padding-left: 0.5rem;
`;

const Date = styled.div`
  width: 100%;
  text-align: end;
  color: #999;
`;

const Content = styled.div`
  width: 100%;
`;

const Li = styled.div`
  width: 8px;
  height: 8px;
  background-color: #6c5ce7;
  border-radius: 50%;
`;
const ContentWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Nes = styled.div`
  gap: 5px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  color: #333;
  text-decoration: none;
  padding: 16px 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  margin-bottom: 15px;
  /* border-left: 5px solid #6c5ce7; */
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, #6c5ce7, #81ecec);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1);

    &::before {
      opacity: 0.05;
    }
  }

  &:active {
    transform: translateY(-3px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  & > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 14px 18px;
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
  padding: 1rem 1rem;
  padding-bottom: 1.2rem;

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
  justify-content: space-between;
  align-items: center;
  gap: 5px;
`;

const NewsTitle = styled.p`
  color: #080a0b;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 20px;
`;

const More = styled.button`
  display: flex;
  padding: 0;
  border: 0;
  margin: 0;
  background: none;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 5px 15px;
  color: #8800fb;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(2px);
  }
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

// 카드뉴스 사용하려고 했던거
{
  /* <NewsWrap>
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
      </NewsWrap> */
}
