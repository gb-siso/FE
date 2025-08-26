import { DownIcon, UpIcon } from '@/assets/svg';
import styled from 'styled-components';
import { VipRatings } from '@/constants/Main/index';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { userMeAtom } from '@/modules/auth/atoms';
import { useAtomValue, useSetAtom } from 'jotai';
import { toast } from 'react-toastify';
import { postDislikeAtom, postHandleReactionAtom, vipsAtom } from '../../atom';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { toastDark } from '@/lib/customToast';

const UserComments = ({ ratings }: { ratings: VipRatings }) => {
  const { ratingList } = ratings || {};
  const countRating = ratingList?.length;
  // const getToken = useSetAtom(getTokenAtom);

  // ATOM
  const userMe = useAtomValue(userMeAtom);
  const postHandleReaction = useSetAtom(postHandleReactionAtom);
  const postDislike = useSetAtom(postDislikeAtom);

  // STATE
  const [activeVote, setActiveVote]: any = useState({});

  const router = useRouter();

  const isLogin = userMe?.nickname !== '';

  const renderRating = (rating: number | null) => {
    return (
      <RatingWrapper>
        <StarContainer>
          <Star $filled={true}>★</Star>
        </StarContainer>
        <RatingText>{rating} / 10</RatingText>
      </RatingWrapper>
    );
  };

  const likeUnLikePushHandler = async (id: string, type: string) => {
    if (!isLogin) {
      toast.warning('로그인 후 눌러주세요!');
      return;
    }

    try {
      setActiveVote((prevState: any) => {
        const updatedState: any = { ...prevState };

        if (type === 'like') {
          updatedState[id] = {
            like: true,
            dislike: false
          };
        }

        if (type === 'dislike') {
          updatedState[id] = {
            like: false,
            dislike: true
          };
        }

        return updatedState;
      });

      if (type === 'like') {
        await postHandleReaction({ id });
      }
      if (type === 'dislike') {
        await postDislike({ id });
      }

      router.refresh();
      toast.success('피드백이 반영되었습니다!');
    } catch (error) {
      console.log(error);
      toastDark('이미 반영중이에요!');
    }
  };
  return (
    <Wrapper>
      {/* <Contour /> */}
      <Header>
        <TitleWrapper>
          <IconWrap>💬</IconWrap>
          <Title>
            시민의 소리 <Count>{countRating ? `[${countRating}]` : ''}</Count>
          </Title>
        </TitleWrapper>
        <SubTitle>여러분의 소중한 의견을 들려주세요! 🐾</SubTitle>
      </Header>

      {!ratingList?.length ? (
        <EmptyState>
          <EmptyIcon>📭</EmptyIcon>
          <EmptyText>
            아직 등록된 평가가 없습니다.
            <br />첫 번째 의견을 남겨주세요!
          </EmptyText>
        </EmptyState>
      ) : (
        <CommentList>
          {ratingList.map((item, idx) => (
            <CommentCard key={idx}>
              <CardHeader>
                <UserInfo>
                  <UserName>{item.member.nickname}</UserName>
                  <PostDate>
                    {item?.createdAt
                      ? formatDistanceToNow(new Date(item?.createdAt), {
                          addSuffix: true,
                          locale: ko
                        })
                      : '-'}
                  </PostDate>
                </UserInfo>
                {renderRating(item?.rate)}
              </CardHeader>

              <CommentContent>
                {item.content || '앗, 점수는 있는 평가입니다!'}
              </CommentContent>

              <InteractionContainer>
                <VoteButton
                  onClick={() => likeUnLikePushHandler(item.id, 'like')}
                  $active={activeVote[item.id]?.like}
                >
                  {/* <VoteButton $active={true}> */}
                  <UpIcon width={18} height={18} />
                  <VoteCount>{item.likeCount}</VoteCount>
                </VoteButton>
                <VoteButton
                  $dislike
                  onClick={() => likeUnLikePushHandler(item.id, 'dislike')}
                  $active={activeVote[item.id]?.dislike}
                >
                  <DownIcon width={18} height={18} />
                  <VoteCount>{item.dislikeCount}</VoteCount>
                </VoteButton>
              </InteractionContainer>
            </CommentCard>
          ))}
        </CommentList>
      )}
    </Wrapper>
  );
};

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const StarContainer = styled.div`
  display: flex;
  gap: 0.1rem;
`;

const Star = styled.span<{ $filled: boolean }>`
  color: ${({ $filled }) => ($filled ? '#ffd700' : '#e9ecef')};
  font-size: 1rem;
  transition: color 0.2s;
`;

const RatingText = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: #963ae1;
`;

const Wrapper = styled.div`
  width: 95%;
  padding: 2rem 1.2rem;
  margin: 0 auto;
  margin-bottom: 5rem;
  margin-top: 2rem;
  box-sizing: border-box;
  border-radius: 16px;
  /* background: #f5f7ff; // 청량감 있는 블루 계열
  border: 1px solid #e6e9ff; */
  background: #faf5ff; // 보라색을 부드럽게 반영한 배경
  border: 1px solid #eee5ff;
`;

const Contour = styled.div`
  height: 1px;
  background: #e9ecef;
  margin: 1.5rem 0;
`;

const Header = styled.div`
  margin-bottom: 2rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
`;

const IconWrap = styled.span`
  font-size: 1.8rem;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  color: #2b2d36;
  margin: 0;
`;

const Count = styled.span`
  color: #963ae1;
  font-weight: 700;
  /* 963ae1 */
`;

const SubTitle = styled.p`
  color: #868e96;
  font-size: 0.9rem;
  margin: 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 0;
  background: #fff;
  border-radius: 12px;
  border: 1px dashed #dee2e6;
`;

const EmptyIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  color: #adb5bd;
  line-height: 1.5;
  margin: 0;
`;

const CommentList = styled.div`
  display: grid;
  gap: 1.2rem;
`;

const CommentCard = styled.div`
  background: #fff;
  padding: 1.5rem 1rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const UserName = styled.span`
  font-weight: 600;
  color: #343a40;
  font-size: 0.95rem;
`;

const PostDate = styled.span`
  color: #868e96;
  font-size: 0.8rem;
`;

// const StarContainer = styled.div`
//   display: flex;
//   gap: 0.2rem;
// `;

// const Star = styled.span<{ $filled: boolean }>`
//   color: ${({ $filled }) => ($filled ? '#ffd700' : '#e9ecef')};
//   font-size: 1.2rem;
// `;

const CommentContent = styled.p`
  color: #495057;
  line-height: 1.6;
  margin: 1rem 0;
  font-size: 0.95rem;
  white-space: pre-wrap;
`;

const InteractionContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-top: 1.2rem;
`;

const VoteButton = styled.button<{ $dislike?: boolean; $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 8px;

  background: ${({ $dislike, $active }) =>
    $active
      ? $dislike
        ? '#ffeded'
        : '#e8f3ff'
      : $dislike
        ? '#fff5f5'
        : '#f8f9fa'};
  color: ${({ $dislike, $active }) =>
    $active
      ? $dislike
        ? '#ff4444'
        : '#2a7fff'
      : $dislike
        ? '#ff6b6b'
        : '#4a90e2'};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ $dislike }) => ($dislike ? '#ffe3e3' : '#e9f3ff')};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const VoteCount = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

// import { DownIcon, UpIcon } from '@/assets/svg';
// import styled from 'styled-components';
// import { VipRatings } from '@/constants/Main/index';

// const UserComments = ({ ratings }: { ratings: VipRatings }) => {
//   const { ratingList } = ratings || {};
//   const countRating = ratingList?.length;

//   const renderStars = (rating: number) => {
//     return (
//       <StarContainer>
//         {[...Array(5)].map((_, index) => (
//           <Star key={index} $filled={index < rating}>
//             ★
//           </Star>
//         ))}
//       </StarContainer>
//     );
//   };
//   return (
//     <Wrapper>
//       <Contour />
//       <Header>
//         <TitleWrapper>
//           <IconWrap>💬</IconWrap>
//           <Title>
//             시민의 소리 <Count>{countRating ? `[${countRating}]` : ''}</Count>
//           </Title>
//         </TitleWrapper>
//         <SubTitle>여러분의 소중한 의견이 서비스를 개선합니다! 🐾</SubTitle>
//       </Header>

//       {!ratingList?.length ? (
//         <EmptyState>
//           <EmptyIcon>📭</EmptyIcon>
//           <EmptyText>
//             아직 등록된 평가가 없습니다.
//             <br />첫 번째 의견을 남겨주세요!
//           </EmptyText>
//         </EmptyState>
//       ) : (
//         <CommentList>
//           {ratingList.map((item, idx) => (
//             <CommentCard key={idx}>
//               <CardHeader>
//                 <UserInfo>
//                   <UserName>{item?.member.nickname}</UserName>
//                   <PostDate>{item?.createdDate || '2024-11-24'}</PostDate>
//                 </UserInfo>
//                 {renderStars(item?.rate)}
//               </CardHeader>

//               <CommentContent>
//                 {item.content || '앗, 점수는 있는 평가입니다!'}
//               </CommentContent>

//               <InteractionContainer>
//                 <VoteButton>
//                   <UpIcon width={18} height={18} />
//                   <VoteCount>{item.likeCount}</VoteCount>
//                 </VoteButton>
//                 <VoteButton $dislike>
//                   <DownIcon width={18} height={18} />
//                   <VoteCount>{item.dislikeCount}</VoteCount>
//                 </VoteButton>
//               </InteractionContainer>
//             </CommentCard>
//           ))}
//         </CommentList>
//       )}
//     </Wrapper>
//   );
// };

// export default UserComments;

// import { DownIcon, UpIcon } from '@/assets/svg';
// import styled from 'styled-components';
// import { VipRatings } from '@/constants/Main/index';

// const UserComments = ({ ratings }: { ratings: VipRatings }) => {
//   const { ratingList } = ratings || {};
//   const countRating = ratingList?.length;
//   return (
//     <Wrapper>
//       <Contour />
//       <TextWrapper>
//         <IconWrap>💬</IconWrap>
//         <Title>
//           시민의 소리<Span>{`${countRating ? `[${countRating}]` : ''}`}</Span>
//         </Title>
//       </TextWrapper>
//       <Plz> (여러분의 목소리가 필요해요! 🐾)</Plz>
//       {!ratingList?.length && (
//         <NotFoundBox>
//           <NotFound>
//             아직 평가가 없어요 🙈 <br />
//             당신의 소중한 의견을 남겨주세요!
//           </NotFound>
//         </NotFoundBox>
//       )}

//       {ratingList && countRating > 0 && (
//         <>
//           {ratingList.map((item, idx) => {
//             const {
//               member: { nickname },
//               likeCount,
//               dislikeCount,
//               content
//             } = item || {};
//             const isString = typeof content;
//             return (
//               <CommentsWrapper key={idx}>
//                 <CommentsBox>
//                   <UserComment>
//                     {typeof content !== 'string' || content.length === 0
//                       ? '앗, 점수는 있는 평가입니다!'
//                       : `"${content}"`}
//                   </UserComment>
//                   <CommentBottom>
//                     <LikeBox>
//                       <Up>
//                         <UpIcon width={20} height={20} />
//                         <UpText>{likeCount}</UpText>
//                       </Up>
//                       <Down>
//                         <DownIcon width={20} height={20} />
//                         <DownText>{dislikeCount}</DownText>
//                       </Down>
//                     </LikeBox>
//                     <DateWrapper>
//                       <UserName>{nickname}</UserName>
//                       <Date>{'2024-11-24'}</Date>
//                     </DateWrapper>
//                   </CommentBottom>
//                 </CommentsBox>
//               </CommentsWrapper>
//             );
//           })}
//         </>
//       )}
//     </Wrapper>
//   );
// };

export default UserComments;

// const Plz = styled.span`
//   margin-top: 5px;
//   font-size: 1rem;
//   color: #666;
//   @media (max-width: 768px) {
//     font-size: 0.85rem;
//     letter-spacing: 0.5px;
//   }
// `;
// const PlzText = styled.div`
//   text-align: center;
//   padding: 10px 30px;
//   padding-bottom: 15px;
//   background-color: #222;
//   border-radius: 50px;
//   color: #fff;
// `;
// const NotFoundBox = styled.div`
//   box-sizing: border-box;
//   margin-top: 30px;
//   padding: 1rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;
// const NotFound = styled.div`
//   text-align: center;
//   padding: 10px 30px;
//   background-color: #222;
//   border-radius: 50px;
//   color: #fff;
// `;
// const Wrapper = styled.div`
//   width: 95%;
//   padding: 0 0.7rem;
//   padding-bottom: 2rem;
//   background-color: #fff;
//   box-sizing: border-box;
//   margin: 0 auto;
//   margin-top: 2rem;
//   margin-bottom: 5rem;
// `;

// const Contour = styled.div`
//   margin: 0 auto;
//   width: 100%;
//   height: 2px;
//   background-color: #ededed;
//   margin-bottom: 2rem;
// `;

// const TextWrapper = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const Title = styled.div`
//   color: #222; /* 글씨 색상 */
//   font-size: 1.25rem; /* 제목 크기 약간 키우기 */
//   font-weight: 600; /* 약간의 텍스트 강조 */
//   flex: 1; /* 제목이 공간을 차지하게 */
//   margin-left: 0.5rem; /* 아이콘과 제목 간격 */
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// const IconWrap = styled.div`
//   font-size: 1.5rem; /* 아이콘 크기 조정 */
// `;

// const CommentsWrapper = styled.div`
//   width: 100%;
//   box-sizing: border-box;
//   margin-top: 2rem;
// `;

// // 136,0,251,0.3
// const CommentsBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 5px;
//   padding: 1.5rem;
//   border-radius: 24px;
//   background-color: rgba(136, 0, 251, 0.04);
//   box-shadow: rgba(136, 0, 251, 0.2) 0px 3px 8px;
// `;

// const UserComment = styled.div`
//   color: #333;
//   font-size: 1.125rem;
//   font-weight: 400;
//   letter-spacing: 0.4px;
//   line-height: 1.8;
//   margin-bottom: 1.5rem;
//   @media (max-width: 768px) {
//     font-size: 1rem;
//     letter-spacing: 0.5px;
//   }
// `;

// const CommentBottom = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-top: 1rem;
//   padding-left: 0.5rem;
// `;
// const LikeBox = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 10px;
//   font-size: 0.8rem;
//   align-items: center;
// `;

// const DateWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center; /* align-self 대신 align-items 사용 */
//   gap: 0.6rem; /* 적당한 간격 설정 */
//   font-size: 0.85rem; /* 약간 키운 폰트 크기 */
//   color: #333; /* 텍스트 색상 강조 */
// `;

// const UserName = styled.div`
//   @media (max-width: 768px) {
//     font-size: 0.85rem;
//   }
// `;
// const Date = styled.div`
//   @media (max-width: 768px) {
//     font-size: 0.85rem;
//   }
// `;

// const Up = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// `;
// const Down = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   cursor: pointer;
// `;

// const UpText = styled.span`
//   font-size: 0.875rem; /* 적당한 기본 폰트 크기 */
//   color: #555; /* 텍스트 가독성을 위한 부드러운 색상 */
//   font-weight: 500; /* 텍스트 강조 */
//   margin-left: 0.25rem; /* 텍스트와 아이콘 사이 여백 */
// `;

// const DownText = styled.span`
//   font-size: 0.875rem; /* 적당한 기본 폰트 크기 */
//   color: #555; /* 텍스트 가독성을 위한 부드러운 색상 */
//   font-weight: 500; /* 텍스트 강조 */
//   margin-left: 0.25rem; /* 텍스트와 아이콘 사이 여백 */
// `;

// const Span = styled.span`
//   margin-top: 3px;
//   color: #b483dd;
//   font-size: 0.9rem;
// `;
