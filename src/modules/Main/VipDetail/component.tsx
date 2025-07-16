'use client';
import styled from 'styled-components';
import Profile from './components/Profile';
import Info from './components/Info';
import News from './components/News';
import Rating from './components/Rating';
import Initiative from './components/Initiative';
import UserComments from './components/UserComments';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { vipRatings } from '../atom';
import { useEffect } from 'react';
import { VipRatings, Vips } from '@/constants/Main/index';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function VipDetail({
  initialData
}: {
  initialData: {
    ratings: VipRatings;
    vipDetail: Vips;
  };
}) {
  const [ratings, setRatings] = useAtom(vipRatings);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setRatings(initialData.ratings);
  }, [initialData]);

  useEffect(() => {
    router.refresh();
  }, [pathname, router]);

  return (
    <>
      <Wrapper>
        {/* 프로필 */}
        <Profile vipData={initialData.vipDetail} ratings={ratings} />
        {/* 정보 */}
        <Info vipData={initialData.vipDetail} />
        {/*뉴스 */}
        <News />
        {/* 발의안 */}
        <Initiative vipData={initialData.vipDetail} />
        {/* 평가 */}
        <Rating vipId={initialData?.vipDetail?.congressmanList[0]?.id} />
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
