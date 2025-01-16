'use client';

import Link from 'next/link';
import { Flex } from '@/components/Flex/Flex';
import { COMMUNITY } from '@/utils/route';
import { BREAK_POINT, HR } from '@/utils/ui';
import styled from 'styled-components';
import { useState } from 'react';
import SvgHeart from '@/assets/svg/Heart';
import Share from '@/assets/svg/Share';
import UserComment from '@/assets/svg/UserComment';

const MOCK_TAB = ['전체', '인기', '내가 쓴글'];
const MOCK = [
  {
    name: '하이루 방가',
    title: '시소에 오신 여러분 환영합니다',
    desc: 'The whole secret of existence lies in the pursuit of meaning, purpose, and connection. It is a delicate dance between self-discovery, compassion for others, and embracing the ever-unfolding mysteries of life. Finding harmony in the ebb and flow of experiences, we unlock the profound beauty that resides within our shared journey.',
    like: '16',
    comment: '24',
    date: '2025-01-17',
    isMeWrite: false
  },
  {
    name: '소리없는 바람',
    title: '새로운 시작을 위한 발걸음',
    desc: 'A journey of a thousand miles begins with a single step. Every moment is a chance to begin anew, to shed old layers and emerge stronger. Let us walk together in search of the infinite possibilities that await us.',
    like: '43',
    comment: '56',
    date: '2025-01-16',
    isMeWrite: false
  },
  {
    name: '별빛 마을',
    title: '밤하늘을 바라보며',
    desc: 'In the quiet of the night, the stars whisper secrets of the universe. As we gaze upon the vastness, we realize how small yet significant our journey is in this cosmic dance. Let’s keep exploring together.',
    like: '12',
    comment: '9',
    date: '2025-01-15',
    isMeWrite: true
  },
  {
    name: '해변의 고요',
    title: '물결 속에서 찾은 평화',
    desc: 'The oceans waves remind us that life’s challenges are fleeting. As the tide recedes and returns, we find peace in the rhythm of the ebb and flow. Embrace the stillness, for it is where growth happens.',
    like: '29',
    comment: '12',
    date: '2025-01-14',
    isMeWrite: false
  },
  {
    name: '푸른 나무',
    title: '뿌리 깊은 나무처럼',
    desc: 'Like a tree with deep roots, we find strength in the foundation we build. The storms may come, but with a solid core, we can weather any storm and continue to grow toward the sky.',
    like: '56',
    comment: '34',
    date: '2025-01-13',
    isMeWrite: false
  },
  {
    name: '길고양이',
    title: '소소한 행복의 발견',
    desc: 'Happiness is not found in grand gestures, but in the small moments. A kind word, a warm smile, a fleeting glance – these are the treasures that make life worth living.',
    like: '72',
    comment: '89',
    date: '2025-01-12',
    isMeWrite: false
  },
  {
    name: '달빛정원',
    title: '달빛 속의 꿈',
    desc: 'Under the soft glow of the moon, dreams feel closer. In the silence of the night, our hearts speak louder, revealing the desires and aspirations that lie within us.',
    like: '91',
    comment: '110',
    date: '2025-01-11',
    isMeWrite: false
  },
  {
    name: '푸른 하늘',
    title: '끝없는 가능성',
    desc: 'The sky’s vastness reminds us of the endless opportunities that await. As we stretch our wings and soar, the horizon becomes a canvas for the dreams we paint.',
    like: '104',
    comment: '53',
    date: '2025-01-10',
    isMeWrite: false
  },
  {
    name: '구름 속의 소리',
    title: '비오는 날의 멜로디',
    desc: 'The sound of raindrops dancing on the roof is a melody of peace. It’s in these moments of solitude that we find clarity, reflection, and the courage to move forward.',
    like: '63',
    comment: '47',
    date: '2025-01-09',
    isMeWrite: false
  },
  {
    name: '미소천사',
    title: '사랑이 넘치는 순간',
    desc: 'Love is the most powerful force in the universe. It transcends time, space, and distance, connecting us all in ways words can never fully describe. Let’s cherish every moment together.',
    like: '37',
    comment: '61',
    date: '2025-01-08',
    isMeWrite: false
  }
];

const Components = () => {
  const [focusTab, setFocusTab] = useState('전체');
  return (
    <Wrap>
      <Tab>
        <Nav>
          <Ul>
            {MOCK_TAB.map((item, idx) => (
              <Li
                key={idx}
                actived={focusTab === item}
                onClick={() => setFocusTab(item)}
              >
                {item}
              </Li>
            ))}
          </Ul>
        </Nav>
      </Tab>
      <MainSection>
        {MOCK?.map((item) => (
          <Card key={item?.name} actived={item?.isMeWrite}>
            <TopBox>
              <UserImage>
                <Image src="/puppy.png" />
              </UserImage>
              <VipRightBox>
                <VipInfoWrap>
                  <UserName>{item.name}</UserName>
                  <Title>{item.title}</Title>
                </VipInfoWrap>
              </VipRightBox>
            </TopBox>
            <Post actived={item?.isMeWrite}>{item?.desc}</Post>
            <Bottom>
              <Left>
                <Like>
                  <SvgHeart />
                  <LikeCnt>{item?.like}</LikeCnt>
                </Like>
                <Comment>
                  <UserComment />
                  <CommentCnt>{item?.comment}</CommentCnt>
                </Comment>
              </Left>
              <Right>
                <Share />
                <ShareText>share</ShareText>
              </Right>
            </Bottom>
          </Card>
        ))}
      </MainSection>
    </Wrap>
  );
};

export default Components;

export const Wrap = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0 1rem;
  flex-direction: column;
  margin-bottom: 100px;
  box-sizing: border-box;
`;

const Tab = styled.div`
  width: 100%;
`;

const Nav = styled.nav`
  width: 100%;
`;

const Ul = styled.ul`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  padding-bottom: 0.5rem;
  padding-left: 5px;
  border-bottom: 1px solid rgb(235, 238, 240);
`;
const Li = styled.li<{ actived?: boolean }>`
  list-style: none;
  color: ${({ actived }) => (actived ? '#8800FB' : '#666')};
  font-size: ${({ actived }) => (actived ? '1.1rem' : '1rem')};
  font-weight: ${({ actived }) => (actived ? '600' : '400')};
  cursor: pointer;
  text-align: center;
  padding: 5px 15px;
  position: relative;
  transition: all 0.1s ease-in-out;

  &:hover {
    color: ${({ actived }) => (actived ? '#8800FB' : '#6600D4')};
  }

  &::after {
    content: '';
    position: absolute;
    top: ${({ actived }) =>
      actived ? 'calc(100% + 0.33rem - 1px)' : 'calc(100% + 0.33rem)'};
    left: 0;
    width: 100%;
    height: 5px;
    border-radius: 7px 7px 0 0;
    background-color: ${({ actived }) => (actived ? '#8800FB' : 'none')};
    transition: all 0.1s ease-in-out;
  }
`;

const MainSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 1.5rem;
`;

const Card = styled.div<{ actived?: boolean }>`
  width: 100%;
  padding: 1.5rem 1rem;
  border-radius: 10px;
  box-shadow:
    rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;
  background-color: ${({ actived }) =>
    actived ? `rgba(136, 0, 251, 0.1)` : '#fff'};
`;

const TopBox = styled.div`
  display: flex;
  gap: 1rem;
`;

const UserImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
`;

const VipInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 3px;
`;

const UserName = styled.h4`
  margin: 0;
  padding: 0;
  color: #030303;
  font-size: 1.125rem; /* 1.1rem -> 1.125rem */
  font-weight: 600;
  line-height: 24px;
  text-align: left;
`;

const Title = styled.h5`
  margin: 0;
  padding: 0;
  color: #777;
  font-weight: 500;
  font-size: 1rem; /* 14px -> 1rem */
  line-height: 18px;
  text-align: left;
`;

const VipRightBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Post = styled.div<{ actived?: boolean }>`
  border-top: 1.5px solid ${({ actived }) => (actived ? '#fff' : '#ebeef0')};
  border-bottom: 1.5px solid ${({ actived }) => (actived ? '#fff' : '#ebeef0')};
  padding: 2rem 0;
  font-size: 1.2rem;
  line-height: 2.5rem;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  padding-left: 0.5rem;
`;

const Left = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Like = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const LikeCnt = styled.div`
  font-size: 1rem;
  padding-bottom: 3px;
  font-weight: 900;
`;

const Comment = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentCnt = styled.div`
  font-size: 1rem;
  padding-bottom: 3px;
  font-weight: 900;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ShareText = styled.div`
  font-size: 0.9rem;
  color: #666;
  font-weight: 700;
`;
