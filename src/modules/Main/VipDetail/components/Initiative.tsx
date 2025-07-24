import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';

import 'swiper/css/navigation';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAtomValue, useSetAtom } from 'jotai';
import { billAtom, getBillAtom, getBillsAtom } from '../../atom';
import useHandler from '@/app/hooks/useHandler';
import Spinner from '@/app/_components/Spinner';

// const colors = [
//   'crimson',
//   '#FF9800',
//   '#4CAF50',
//   '#2196F3',
//   '#9C27B0', // 퍼플 (보라 계열로 대비)
//   '#00BCD4', // 시안 (밝은 청록색)
//   '#FFC107', // 밝은 앰버 (노란빛 강조)
//   '#795548', // 브라운 (중간톤 중립색)
//   '#607D8B', // 블루그레이 (시각적 안정성)
//   '#E91E63' // 핑크레드 (포인트 컬러로 강렬함)
// ];
const colors = [
  'crimson',
  '#FF9800',
  '#4CAF50',
  '#2196F3',
  '#9C27B0', // 퍼플 (보라 계열로 대비)
  '#00BCD4', // 시안 (밝은 청록색)
  '#FFC107', // 밝은 앰버 (노란빛 강조)
  '#795548', // 브라운 (중간톤 중립색)
  '#607D8B', // 블루그레이 (시각적 안정성)
  '#B0174A' // 핑크레드 톤다운 (채도·명도 낮춘 버전)
];

const News: React.FC<any> = ({ vipData }) => {
  // const [isMore, setIsMore] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const bills = useAtomValue(billAtom);
  const getBills = useSetAtom(getBillsAtom);
  const list = bills?.billList || [];

  const isMore = bills?.lastPage > currentPage;

  // HTTP 요청
  const { isLoading, handler: initHandler } = useHandler(
    async (page: number) => {
      const id = vipData?.congressmanList[0]?.id;
      await getBills({ id, query: { page } });
      setCurrentPage(page + 1);
    }
  );

  const modalHandler = (item: any) => {
    setSelected(item);
  };
  const modalCloseHandler = () => {
    setSelected(null);
  };

  const hadleMovePage = (url: string) => {
    window.open(url, '_blank');
  };

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selected]);

  useEffect(() => {
    initHandler(currentPage);
  }, []);

  return (
    <Wrapper>
      <TitleWrapper>
        <NewsTitle>⚖️ 최근 발의한 법안들을 한눈에 </NewsTitle>
      </TitleWrapper>
      {isLoading && (
        <Spinner title={'입법활동 데이터를 가져오는 중이에요! 😊'} />
      )}

      {!list?.length && !isLoading && (
        <NotFound>해당 의원의 입법활동 기록이 없어요. 🥲</NotFound>
      )}
      <MainSection>
        {list?.length > 0 &&
          list.map((item: any, index: number) => {
            const { billListProjectionDTO: bill } = item;
            const colorIndex = index >= 10 ? index % 10 : index;
            const fontSize = bill.category.length > 4 ? '1.1rem' : '1.2rem';

            return (
              <Card
                key={index}
                $color={colors[colorIndex]}
                onClick={() => modalHandler(item)}
                style={{ fontSize }}
              >
                {bill.category}
              </Card>
            );
          })}
      </MainSection>
      {isMore && (
        <MoreButton onClick={() => initHandler(currentPage)}>더보기</MoreButton>
      )}
      {selected && (
        <Modal onClick={() => modalCloseHandler()}>
          <Inner>
            {/* <Inner onClick={(e) => e.stopPropagation()}> */}
            <div>[{selected.billListProjectionDTO.billName}] </div>
            <Column>
              <span>요약: </span>
              <span>{selected.billListProjectionDTO.content}</span>
            </Column>
            <Column>
              <span>왜 발의했나요? </span>
              <span>{selected.billListProjectionDTO.reason}</span>
            </Column>
            <Column>
              <span>기대효과: </span>
              <span>{selected.billListProjectionDTO.expected}</span>
            </Column>
            <Column>
              <span>발의일자 : </span>
              <span>{selected.billListProjectionDTO.committeeDt}</span>
            </Column>
            <Move
              onClick={() =>
                hadleMovePage(selected.billListProjectionDTO.detailLink)
              }
            >
              <span>자세히 보러가기</span>
            </Move>
          </Inner>
        </Modal>
      )}
    </Wrapper>
  );
};

export default News;

const NewsTitle = styled.p`
  color: #080a0b;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 20px;
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

const MainSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // 4열 그리드
  gap: 15px;
  margin: 1rem auto;
  width: 100%;

  /* 태블릿 사이즈 (768px 미만) */
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); // 2열로 변경
  }
`;

const NotFound = styled.div`
  margin: 1rem auto;
  width: 100%;
`;

const Card = styled.div<{ $color: string }>`
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  background: ${({ $color }: any) => $color || 'white'};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  /* padding: 1rem; */
  text-align: center;
  /* font-size: 1.1rem; */
  font-weight: 500;
  color: #fff;

  text-shadow:
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    1px 1px 0 #000;

  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

// const Card = styled.div`
//   box-sizing: border-box;
//   width: 100px;
//   height: 100px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   border-radius: 5px;
//   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
//   cursor: pointer;
// `;

const Modal = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 20;
`;

const Inner = styled.div`
  box-sizing: border-box;
  border-radius: 16px;
  padding: 2rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: auto;
  max-width: 550px;
  max-height: 90vh;
  background-color: #fff;
  white-space: pre-line;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }

  /* 제목 스타일 */
  > div:first-child {
    font-size: 1.4rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
    line-height: 1.4;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #f0f0f0;
  }

  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  > span:first-child {
    font-weight: 600;
    color: #555;
    font-size: 1.1rem;
  }

  > span:last-child {
    color: #333;
    line-height: 1.6;
    padding-left: 0.5rem;
  }
`;

const Move = styled.div`
  cursor: pointer;
  padding: 0.8rem 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
  margin-top: 1rem;
  font-weight: 500;
  color: #444;

  &:hover {
    background-color: #8800fb;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(136, 0, 251, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    background-color: #8800fb;
    color: white;
  }
`;

const MoreButton = styled.button`
  border: none;
  width: 120px;
  height: 40px;
  margin: 1rem auto 0;
  background: linear-gradient(135deg, #8800fb 0%, #9c27b0 100%);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  gap: 6px;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 2px 4px rgba(136, 0, 251, 0.2);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(136, 0, 251, 0.3);
    background: linear-gradient(135deg, #9c27b0 0%, #8800fb 100%);

    &::after {
      content: '';
      position: absolute;
      right: 15px;
      transition: all 0.3s ease;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(136, 0, 251, 0.2);
  }

  @media (max-width: 768px) {
    width: 110px;
    height: 38px;
    font-size: 0.85rem;
  }
`;

const BillCategory = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 500;
  /* background-color: rgba(0, 0, 0, 0.1); */
  display: flex;
  align-items: center;
  justify-content: center;
`;
