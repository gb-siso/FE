import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';

import 'swiper/css/navigation';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAtomValue, useSetAtom } from 'jotai';
import { billAtom, getBillAtom } from '../../atom';
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
  const [selected, setSelected] = useState<any>(null);

  // const [slides, setSlides] = useState(MOCK);

  const findBill = useSetAtom(getBillAtom);
  const bills = useAtomValue(billAtom);
  const { row } = bills;

  const removeHtmlEntities = (text: string) => {
    return text.replace(/&#[0-9]+;/g, '');
  };

  const { isLoading, handler: initHandler } = useHandler(async () => {
    const name = decodeURIComponent(params?.vipId as string);
    await findBill({ name });

    // summaryContentDiv
  });

  const modalHandler = (item: any) => {
    setSelected(item);
    console.log(item);
  };
  const modalCloseHandler = () => {
    setSelected(null);
  };

  useEffect(() => {
    initHandler();
  }, []);

  return (
    <Wrapper>
      <TitleWrapper>
        <NewsTitle>⚖️ 입법 활동</NewsTitle>
      </TitleWrapper>
      {isLoading && (
        <Spinner title={'입법활동 데이터를 가져오는 중이에요! 😊'} />
      )}
      <MainSection>
        {!row.length && !isLoading && (
          <NotFound>해당 의원의 입법활동 기록이 없어요. 🥲</NotFound>
        )}
        {0 < row.length &&
          row.map((item: any, key: number): React.ReactNode => {
            return (
              <Card key={key} onClick={() => modalHandler(item)}>
                {item.category}
              </Card>
            );
          })}
      </MainSection>
      {selected && (
        <Modal onClick={() => modalCloseHandler()}>
          <Inner>{selected.bill}</Inner>
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
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin: 1rem auto;
`;

const NotFound = styled.div`
  margin: 1rem auto;
`;

const Card = styled.div`
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  cursor: pointer;
`;

const Modal = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 10;
`;

const Inner = styled.div`
  box-sizing: border-box;
  border-radius: 10px;
  padding: 2rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 350px;
  height: 100%;
  max-height: 600px;
  background-color: #fff;
  white-space: pre-line;
  line-height: 2.5rem;
`;
