'use client';
import { isLoadingAtom } from '@/atoms/atom';
// import Button from '@/components/Button/Button';
import { useAtomValue } from 'jotai';
import { usePathname } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';
import data from '@/MOCK/vipData.json';
import Link from 'next/link';

const HomeView = () => {
  const isLoading = useAtomValue(isLoadingAtom);
  const path = usePathname();

  if (isLoading) {
    return <></>;
  }
  return (
    <Wrapper>
      {data.map((item, idx) => (
        <Card key={idx}>
          <StyledLink href={`/${idx}`}>
            <PoliticianInfo>
              <VipImgWrap>
                <Badge src="/test/badge.png" />
              </VipImgWrap>
              <VipRightBox>
                <VipInfoWrap>
                  <VipName>{item.name}</VipName>
                  <VipLocation>{item.team}</VipLocation>
                </VipInfoWrap>
                <VipCountWrap>
                  <VipCount>{item.winCount}회 당선</VipCount>
                </VipCountWrap>
              </VipRightBox>
            </PoliticianInfo>
            <VipProfileImgWrap>
              <VipImg src="/test/main.jpg" />
            </VipProfileImgWrap>
            <EvaluationBox>
              <UsersBox>
                {[1, 2, 3, 4].map((src, idx) => (
                  <User key={idx} $index={idx}>
                    <UserImg src={`/test/${src}.png`} />
                  </User>
                ))}
              </UsersBox>
              <RatingBox>
                {/* <Rating src="/test/iconStar.png" /> */}
                <Rating src="/test/iconStar3.png" />
                <RatingNumber>
                  {item.rating}
                  <RatingSpan>점</RatingSpan>
                </RatingNumber>
              </RatingBox>
            </EvaluationBox>
          </StyledLink>
        </Card>
      ))}
      {/* <ButtonWrap>
        <Button name="+ Random Rating Go" size="xxl" radius="18px" />
      </ButtonWrap> */}
    </Wrapper>
  );
};

export default HomeView;

const RatingSpan = styled.span`
  font-weight: 500;
  font-size: 0.8rem;
  padding-bottom: 10px;
  margin-left: 2px;
`;

const Wrapper = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 2rem;
  padding-top: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-bottom: 30rem;
`;

const ButtonWrap = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: end;
  box-sizing: border-box;
  padding: 0 1.5rem;
  padding-top: 2rem;
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const PoliticianInfo = styled.div`
  display: flex;
  justify-content: start;
  padding-left: 0.7rem;
  gap: 10px;
`;

const VipImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Badge = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
const VipInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-family: 'Noto Sans KR', serif;
`;
const VipName = styled.h4`
  margin: 0;
  padding: 0;
  color: #030303;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
`;
const VipLocation = styled.h5`
  margin: 0;
  padding: 0;
  color: #888;
  font-size: 14px;
  line-height: 18px;
`;

const VipRightBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const VipCountWrap = styled.div`
  display: flex;
  height: 40px;
  align-items: end;
  padding-right: 1rem;
  padding-bottom: 3px;
  margin-right: 0.5rem;
`;
const VipCount = styled.h6`
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 14px;
  line-height: 18px;
  text-align: right;
  font-weight: 500;
`;

const VipProfileImgWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 1rem;
  border-radius: 24px;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
`;

const VipImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: inherit;
`;

const EvaluationBox = styled.div`
  width: 90%;
  background-color: #ead5fb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 2rem;
  box-sizing: border-box;
  margin: 0 auto;
  border-radius: 24px;
  margin-top: -2rem;
  padding-left: 1rem;
  position: relative;
`;

const UsersBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 60%;
  position: relative;
`;
const User = styled.div<{ $index: number }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  left: ${({ $index }) => `${$index * 20}px`};
`;

const UserImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: inherit;
`;

const RatingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const Rating = styled.img`
  width: 35px;
  height: 35px;
  height: auto;
  object-fit: cover;
  border-radius: inherit;
  padding-top: 5px;
`;
const RatingNumber = styled.span`
  color: #8800fb;
  font-size: 1.3rem;
  text-align: right;
  text-decoration: none;
  font-weight: 700;
`;

const StyledLink = styled(Link)`
  text-decoration: none; // 아래줄 없애기
`;

// const Button = styled.button.attrs(
//   ({ buttonType = 'button', disabled = false }: any) => ({
//     type: buttonType,
//     disabled: disabled
//   })
// )`
//   background-color: ${({ disabled }) => (disabled ? 'gray' : 'palevioletred')};
//   color: ${({ disabled }) => (disabled ? 'darkgray' : 'white')};
//   font-size: 1em;
//   margin: 1em;
//   padding: 0.25em 1em;
//   border: 2px solid palevioletred;
//   border-radius: 3px;
//   cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
// `;
