'use client';
import styled from 'styled-components';
import Profile from './components/Profile';
import Info from './components/Info';
import News from './components/News';
import Rating from './components/Rating';
import UserComments from './components/UserComments';
import { useAtom, useSetAtom } from 'jotai';
import { vipRatings } from '../atom';
import { useEffect } from 'react';
import { VipRatings, Vips } from '@/constants/Main/index';
import { accessTokenAtom } from '@/modules/auth/atoms';
export default function VipDetail({
  initialData
}: {
  initialData: {
    ratings: VipRatings;
    accessToken: string;
    vipDetail: Vips;
    news: any;
  };
}) {
  const [ratings, setRatings] = useAtom(vipRatings);
  const setToken = useSetAtom(accessTokenAtom);

  useEffect(() => {
    setRatings(initialData.ratings);
    setToken(initialData.accessToken);
  }, [initialData]);
  return (
    <>
      <Wrapper>
        {/* 프로필 */}
        <Profile vipData={initialData.vipDetail} ratings={ratings} />
        {/* 정보 */}
        <Info />
        {/*뉴스 */}
        <News news={initialData.news} />
        {/* 평가 */}
        <Rating />
        {/* 다른 유저 댓글 */}
        <UserComments ratings={ratings} />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding-top: 1rem;

  background-color: #fff;
`;
