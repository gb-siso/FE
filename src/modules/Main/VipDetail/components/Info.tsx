import React from 'react';
import styled from 'styled-components';
import { VipRatings, Vips } from '@/constants/Main/index';

interface ProfileProps {
  vipData: Vips;
}

const Info: React.FC<ProfileProps> = ({ vipData }) => {
  const { congressmanList } = vipData;
  const { assemblySessions, timesElected } = congressmanList[0] || {};

  return (
    <Wrapper>
      <InfoTitle>국회의원 선출 이력</InfoTitle>
      <DataWrapper>
        <VipHistory>
          {timesElected} / (
          {assemblySessions.map((item, index) => (
            <React.Fragment key={index}>
              {item}대{index !== assemblySessions.length - 1 && ', '}
            </React.Fragment>
          ))}
          )
        </VipHistory>
      </DataWrapper>
    </Wrapper>
  );
};

{
  /* <Ul>
          <VipData>제22대 국민의힘 서울 동작구을</VipData>
          <VipData>제20대 새누리당 서울 동작구을</VipData>
          <VipData>제19대 새누리당 서울 동작구을</VipData>
          <VipData>제18대 한나라당 서울 중구</VipData>
          <VipData>제17대 한나라당 비례대표</VipData>
        </Ul> */
}
export default Info;

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  background-color: #8800fb;
  border-radius: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  margin: 0 auto;
  margin-top: 1rem;
  width: 95%;
  padding: 0 1.5rem;
  flex-direction: column;
  padding-bottom: 2rem;
`;

const InfoTitle = styled.p`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

const DataWrapper = styled.div``;
const VipHistory = styled.p`
  font-size: 15px;
  margin: 0;
  font-weight: 900;
  color: #fff;
  margin: -5px 0;
  font-weight: bold;
  letter-spacing: -0.5px;
  position: relative;
  padding-left: 2rem;
  &::before {
    content: '🇰🇷';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    font-size: 1.3rem;
    color: #fff;
    line-height: 1;
  }
`;
const VipData = styled.li`
  list-style-type: none; /* 기본 점을 제거 */
  position: relative;
  padding-left: 1em;
  font-size: 14px;
  &::before {
    content: '•';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    font-size: 1em;
    color: #666;
    line-height: 1;
  }
`;
const Ul = styled.ul`
  padding-left: 1rem;
`;
