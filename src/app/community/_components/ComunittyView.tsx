'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Flex } from '@/components/Flex/Flex';
import Link from 'next/link';
import { styled } from 'styled-components';

import { COMMUNITY, POST_WRITE_URL } from '@/utils/route';
import {
  BASIC,
  BOX_SHADOW,
  BREAK_POINT,
  HR,
  PRIMARY,
  grey_10,
  grey_11,
  grey_4,
  grey_6
} from '@/utils/ui/constant';
import { Button } from './Button';

export interface CommunityPost {
  boardId: string;
  commentAndReplyCount: number;
  content: string;
  createdAt: string;
  id: number;
  like: boolean;
  thumbnail: null;
  title: string;
  likeCount: number;
  user: {
    id: string;
    nickname: string;
  };
}

type BoardType = { id: string; name: string; createdAt: string };

const ComunittyView = () => {
  const query = useParams();
  const [posts, setPosts] = useState<any[]>([]);
  const [postNotFound, setPostNotFound] = useState(false);

  const viewPosts = () => {
    if (postNotFound) return <NotFound>검색 결과가 없습니다.</NotFound>;
    if (Boolean(posts.length))
      return posts.map((data, idx) => <TextBox data={data} key={idx} />);
  };

  return (
    <Container>
      <Wrap>
        <Contents>
          <Ul>
            <Li>
              <CategoryBox href={`${COMMUNITY}`} $actived={true}>
                전체
              </CategoryBox>
            </Li>
          </Ul>
          <Hr />
        </Contents>
      </Wrap>
    </Container>
  );
};

const TextBox = ({ data }: { data: CommunityPost }) => {
  if (!data) return;
  if (!data?.thumbnail) return;
  return (
    <ArticleLink href={'/'} onClick={() => console.log(123)}>
      <Article>
        <ContentsTop>
          <TextDiv>
            <Title>{data?.title}</Title>
            <Description>
              {Boolean(!data.content.length) && '텍스트가 없는 게시물입니다.'}
              {Boolean(data.content.length) && (
                <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
              )}
            </Description>
          </TextDiv>
          <ImageDiv>
            <Img
              src={data?.thumbnail ? data?.thumbnail : '/images/timo.png'}
              alt="img"
            />
          </ImageDiv>
        </ContentsTop>
        <ContentsBottom>
          <UserNameLikeComment>
            <ContentsBottomParagraph>
              {data?.user?.nickname}
            </ContentsBottomParagraph>
          </UserNameLikeComment>
        </ContentsBottom>
      </Article>
    </ArticleLink>
  );
};

export default ComunittyView;

export const Container = styled(Flex)`
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
  margin-top: 0.7rem;
  @media (width < ${BREAK_POINT.MOBILE}) {
    align-items: normal;
    overflow-x: hidden;
  }
`;

export const Wrap = styled.section`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
`;

export const Img = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  @media (width < ${BREAK_POINT.MOBILE}) {
    width: 60px;
    height: 60px;
  }
`;

export const ContentsTop = styled.div`
  display: flex;
  gap: 50px;
  justify-content: space-between;
  width: 100%;
  @media (width < ${BREAK_POINT.MOBILE}) {
    gap: 15px;
  }
`;

export const UserNameLikeComment = styled.div`
  display: flex;
  align-items: center;
`;

export const ContentsBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 33px;

  @media (width < ${BREAK_POINT.MOBILE}) {
    padding-top: 0;
    font-size: 9px;
  }
`;
export const ArticleLink = styled(Link)`
  box-sizing: border-box;
  width: 98%;
  margin: 0 auto;
  padding: 0 10px;
  border-radius: 15px;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0px 5px 10px #ccc;
    padding: 0 20px;
  }
  @media (width < ${BREAK_POINT.MOBILE}) {
    width: 100%;
  }
`;

export const ContentsBottomParagraph = styled.p`
  margin-right: 13px;
  color: ${grey_11};
  font-size: 14px;

  @media (width < ${BREAK_POINT.MOBILE}) {
    font-size: 11px;
  }
`;

export const TimeParagraph = styled.p`
  color: ${grey_4};
  font-size: 14px;

  @media (width < ${BREAK_POINT.MOBILE}) {
    font-size: 13px;
  }
`;
export const ImageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  overflow: hidden;

  @media (width < ${BREAK_POINT.MOBILE}) {
    width: 60px;
    height: 60px;
  }
`;
export const TextDiv = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 14px;

  @media (width < ${BREAK_POINT.MOBILE}) {
    gap: 4px;
  }
`;

export const Title = styled.h2`
  color: ${BASIC};
  font-weight: 600;
  font-size: 1.1rem;

  @media (width < ${BREAK_POINT.MOBILE}) {
    font-size: 13px;
  }
`;
export const Description = styled.p`
  color: ${grey_10};
  font-size: 0.9rem;

  @media (width < ${BREAK_POINT.MOBILE}) {
    font-size: 12px;
  }
`;

export const SvgWrap = styled.div`
  width: 14px;
  height: 14px;

  @media (width < ${BREAK_POINT.MOBILE}) {
    width: 10px;
    height: 10px;
  }
`;

export const Contents = styled(Flex)`
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  max-width: 1170px;
  margin: auto;
  background-color: #fff;

  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 15px; */
`;

export const Hr = styled.div`
  ${HR}
`;
export const CategoryWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 27px;

  @media (width < ${BREAK_POINT.MOBILE}) {
    padding-bottom: 0;
  }
`;
export const Ul = styled.ul`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const Li = styled.li`
  list-style: none;
`;

export const DesktopFilterBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  @media (width < ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;
export const Paragraph = styled.p`
  @media (width < ${BREAK_POINT.MOBILE}) {
    font-size: 10px;
  }
`;

export const MobileFilterBox = styled.div`
  display: none;
  align-items: center;
  width: 100%;
  margin-top: 10px;

  @media (width < ${BREAK_POINT.MOBILE}) {
    display: flex;
    margin-top: 0;
    margin-bottom: 0;
  }
`;
export const CategoryBox = styled(Link)<{ $actived?: boolean }>`
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 20px 20px;
  border-radius: 22px;
  background-color: ${({ $actived }) => ($actived ? `#8800FB` : '#222')};
  color: ${({ $actived }) => ($actived ? `#fff` : '#222')};
  font-weight: 500;
  cursor: pointer;

  @media (width < ${BREAK_POINT.MOBILE}) {
    padding: 5px 20px;
    border-radius: 100px;
    background-color: ${({ $actived }) => ($actived ? `#992bf2` : '#222')};
    color: ${({ $actived }) => ($actived ? `#fff` : '#222')};
  }
`;

export const TextBoxWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
  margin-top: 7px;
`;

export const Article = styled.div`
  display: flex;
  flex-direction: column;
  gap: 33px;
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid ${grey_6};
  cursor: pointer;
`;

export const NotFound = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1rem;
  color: #999;
`;
