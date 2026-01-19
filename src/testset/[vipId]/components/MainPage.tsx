'use client';

import styled from 'styled-components';
import Profile from './Profile';
import Info from './Info';
import News from './News';
import Rating from './Rating';
import UserComments from './UserComments';

const MainPage = () => {
  return (
    <Wrapper>
      {/* 프로필 */}
      <Profile />
      {/* 정보 */}
      <Info />
      {/*뉴스 */}
      <News />
      {/* 평가 */}
      <Rating />
      {/* 다른 유저 댓글 */}
      <UserComments />
    </Wrapper>
  );
};

export default MainPage;

const Wrapper = styled.div`
  width: 100%;
  padding-top: 1rem;

  background-color: #fff;
`;
