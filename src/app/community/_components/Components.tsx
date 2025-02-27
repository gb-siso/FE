'use client';
import styled from 'styled-components';
import { useState } from 'react';
import SvgHeart from '@/assets/svg/Heart';
import Share from '@/assets/svg/Share';
import UserComment from '@/assets/svg/UserComment';
import Image from 'next/image';

const MOCK_TAB = ['전체', '인기', '내가 쓴글'];
const MOCK = [
  {
    name: '하이루 방가',
    title: '시소에 오신 여러분 환영합니다',
    desc: '존재의 모든 비밀은 의미, 목적, 그리고 연결을 추구하는 데 있습니다. 그것은 자기 발견, 타인에 대한 연민, 그리고 끊임없이 펼쳐지는 삶의 신비를 받아들이는 섬세한 춤과 같습니다. 경험의 흐름 속에서 조화를 찾을 때, 우리는 우리의 여정 속에 깃든 깊은 아름다움을 발견하게 됩니다.',
    like: '16',
    comment: '24',
    date: '2025-01-17',
    isMeWrite: false
  },
  {
    name: '소리없는 바람',
    title: '새로운 시작을 위한 발걸음',
    desc: '천 리 길도 한 걸음부터 시작됩니다. 매 순간은 새로운 시작의 기회이며, 오래된 것을 벗어 던지고 더 강해질 수 있는 기회이기도 합니다. 우리 함께 무한한 가능성을 찾아 나아가 봅시다.',
    like: '43',
    comment: '56',
    date: '2025-01-16',
    isMeWrite: false
  },
  {
    name: '별빛 마을',
    title: '밤하늘을 바라보며',
    desc: '고요한 밤, 별들은 우주의 비밀을 속삭입니다. 광활한 하늘을 바라보며 우리는 작지만 중요한 존재임을 깨닫습니다. 이 끝없는 우주의 춤 속에서 함께 탐험을 계속해 나갑시다.',
    like: '12',
    comment: '9',
    date: '2025-01-15',
    isMeWrite: true
  },
  {
    name: '해변의 고요',
    title: '물결 속에서 찾은 평화',
    desc: '바다의 파도는 우리에게 삶의 도전이 결국은 지나가는 것임을 상기시켜 줍니다. 밀려왔다가 다시 되돌아가는 조수처럼, 우리는 흐름 속에서 평화를 찾을 수 있습니다. 고요함을 받아들이세요. 그곳에서 성장이 이루어집니다.',
    like: '29',
    comment: '12',
    date: '2025-01-14',
    isMeWrite: false
  },
  {
    name: '푸른 나무',
    title: '뿌리 깊은 나무처럼',
    desc: '깊은 뿌리를 가진 나무처럼, 우리는 우리가 쌓아온 기반에서 힘을 얻습니다. 폭풍이 몰아쳐도 단단한 중심이 있다면 우리는 어떤 시련도 견뎌내며 하늘을 향해 계속 성장할 수 있습니다.',
    like: '56',
    comment: '34',
    date: '2025-01-13',
    isMeWrite: false
  },
  {
    name: '길고양이',
    title: '소소한 행복의 발견',
    desc: '행복은 거창한 것이 아니라 작은 순간 속에 있습니다. 따뜻한 말 한마디, 환한 미소, 스치는 눈빛 하나가 삶을 가치 있게 만드는 소중한 보물입니다.',
    like: '72',
    comment: '89',
    date: '2025-01-12',
    isMeWrite: false
  },
  {
    name: '달빛정원',
    title: '달빛 속의 꿈',
    desc: '부드러운 달빛 아래에서는 꿈이 더 가까워 보입니다. 고요한 밤의 침묵 속에서 우리의 마음은 더욱 선명한 목소리로 속삭이며, 우리 안에 숨겨진 바람과 열망을 들려줍니다.',
    like: '91',
    comment: '110',
    date: '2025-01-11',
    isMeWrite: false
  },
  {
    name: '푸른 하늘',
    title: '끝없는 가능성',
    desc: '광활한 하늘은 우리에게 끝없는 기회의 세계를 상기시켜 줍니다. 우리가 날개를 펴고 비상할 때, 지평선은 우리가 그리는 꿈의 캔버스가 됩니다.',
    like: '104',
    comment: '53',
    date: '2025-01-10',
    isMeWrite: false
  },
  {
    name: '구름 속의 소리',
    title: '비오는 날의 멜로디',
    desc: '빗방울이 지붕 위에서 춤추는 소리는 평온한 멜로디와 같습니다. 이러한 고요한 순간 속에서 우리는 명확함을 찾고, 스스로를 돌아보며, 앞으로 나아갈 용기를 얻습니다.',
    like: '63',
    comment: '47',
    date: '2025-01-09',
    isMeWrite: false
  },
  {
    name: '미소천사',
    title: '사랑이 넘치는 순간',
    desc: '사랑은 이 우주에서 가장 강력한 힘입니다. 그것은 시간, 공간, 거리를 초월하여 우리 모두를 연결합니다. 말로는 다 표현할 수 없는 사랑의 힘을 소중히 여기고, 함께하는 모든 순간을 아끼며 살아갑시다.',
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
        {MOCK.map((item, key) => {
          return (
            <SiteContainer key={key}>
              <RankContainer>
                <img src="/puppy.png" alt="A cute puppy" />
              </RankContainer>
              <InfoContainer>
                <TitleContainer>
                  <TitleLink
                    href={`https://naver.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.desc.slice(0, 19)}
                    <Span>...</Span>
                  </TitleLink>
                </TitleContainer>
                <TagsContainer>
                  <Tag>{item.date}</Tag>
                  <VisitorCount>
                    <StyledHeart />
                    {item.comment.toLocaleString()}
                  </VisitorCount>
                </TagsContainer>
              </InfoContainer>
            </SiteContainer>
          );
        })}
      </MainSection>
    </Wrap>
  );
};

export default Components;

const StyledHeart = styled(UserComment)`
  margin-top: 5px;
  & > path {
    fill: #00ffa8;
    stroke: #00ffa8;
  }
`;

const Span = styled.span`
  font-size: 0.9rem;
`;
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
  gap: 5px;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const SiteContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #eee;
  box-sizing: border-box;
  overflow: hidden;
`;

const RankContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-weight: bold;
  font-size: 1.2rem;
  width: 50px;
  text-align: center;
`;

const InfoContainer = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TitleContainer = styled.div``;

const TitleLink = styled.a`
  text-decoration: none;
  color: #333;
  font-size: 1.05rem;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  padding-right: 5px;
`;

const Tag = styled.div`
  background-color: #f0f0f0;
  color: #555;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
`;

const VisitorCount = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-align: right;
  color: #00ffa8;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
`;

// {MOCK?.map((item) => (
//   <Card key={item?.name} actived={item?.isMeWrite}>
//     <TopBox>
//       <UserImage>
//         <Image
//           src="/puppy.png"
//           alt="A cute puppy"
//           width={35}
//           height={35}
//           layout="intrinsic"
//           style={{
//             borderRadius: '50%',
//             border: '2px solid #fff',
//             boxShadow: ' 0px 2px 6px rgba(0, 0, 0, 0.4)'
//           }}
//         />
//       </UserImage>
//       <VipRightBox>
//         <VipInfoWrap>
//           <UserName>{item.name}</UserName>
//           <Title>{item.title}</Title>
//         </VipInfoWrap>
//       </VipRightBox>
//     </TopBox>
//     <Post actived={item?.isMeWrite}>{item?.desc}</Post>
//     <Bottom>
//       <Left>
//         <Like>
//           <SvgHeart />
//           <LikeCnt>{item?.like}</LikeCnt>
//         </Like>
//         <Comment>
//           <UserComment />
//           <CommentCnt>{item?.comment}</CommentCnt>
//         </Comment>
//       </Left>
//       <Right>
//         <Share />
//         <ShareText>share</ShareText>
//       </Right>
//     </Bottom>
//   </Card>
// ))}

// const Card = styled.div<{ actived?: boolean }>`
//   width: 100%;
//   padding: 1.5rem 1rem;
//   border-radius: 10px;
//   box-shadow:
//     rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
//     rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
//   box-sizing: border-box;
//   background-color: ${({ actived }) =>
//     actived ? `rgba(136, 0, 251, 0.1)` : '#fff'};
// `;

// const TopBox = styled.div`
//   display: flex;
//   gap: 1rem;
// `;

// const UserImage = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const Image = styled.img`
//   width: 35px;
//   height: 35px;
//   border-radius: 50%;
//   border: 2px solid #fff;
//   box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
// `;

// const VipInfoWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   gap: 3px;
// `;

// const UserName = styled.h4`
//   margin: 0;
//   padding: 0;
//   color: #030303;
//   font-size: 1.125rem; /* 1.1rem -> 1.125rem */
//   font-weight: 600;
//   line-height: 24px;
//   text-align: left;
// `;

// const Title = styled.h5`
//   margin: 0;
//   padding: 0;
//   color: #777;
//   font-weight: 500;
//   font-size: 1rem; /* 14px -> 1rem */
//   line-height: 18px;
//   text-align: left;
// `;

// const VipRightBox = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// `;

// const Post = styled.div<{ actived?: boolean }>`
//   border-top: 1.5px solid ${({ actived }) => (actived ? '#fff' : '#ebeef0')};
//   border-bottom: 1.5px solid ${({ actived }) => (actived ? '#fff' : '#ebeef0')};
//   padding: 2rem 0;
//   font-size: 1.2rem;
//   line-height: 2.5rem;
// `;

// const Bottom = styled.div`
//   display: flex;
//   justify-content: space-between;
//   padding: 0 1rem;
//   padding-left: 0.5rem;
// `;

// const Left = styled.div`
//   display: flex;
//   gap: 15px;
//   align-items: center;
// `;

// const Like = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 4px;
// `;

// const LikeCnt = styled.div`
//   font-size: 1rem;
//   padding-bottom: 3px;
//   font-weight: 900;
// `;

// const Comment = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

// const CommentCnt = styled.div`
//   font-size: 1rem;
//   padding-bottom: 3px;
//   font-weight: 900;
// `;

// const Right = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 8px;
// `;

// const ShareText = styled.div`
//   font-size: 0.9rem;
//   color: #666;
//   font-weight: 700;
// `;
