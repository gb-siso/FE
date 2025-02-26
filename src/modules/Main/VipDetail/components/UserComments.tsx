import { DownIcon, UpIcon } from '@/assets/svg';
import styled from 'styled-components';
import { VipRatings } from '@/constants/Main/index';

const UserComments = ({ ratings }: { ratings: VipRatings }) => {
  const { ratingList } = ratings || {};
  const countRating = ratingList?.length;
  return (
    <Wrapper>
      <Contour />
      <TextWrapper>
        <IconWrap>💬</IconWrap>
        <Title>
          시민의 소리<Span>{`${countRating ? `[${countRating}]` : ''}`}</Span>
        </Title>
      </TextWrapper>
      <Plz> (여러분의 목소리가 필요해요! 🐾)</Plz>
      {!ratingList?.length && (
        <NotFoundBox>
          <NotFound>
            아직 평가가 없어요 🙈 <br />
            당신의 소중한 의견을 남겨주세요!
          </NotFound>
        </NotFoundBox>
      )}

      {ratingList && countRating > 0 && (
        <>
          {ratingList.map((item, idx) => {
            const {
              member: { nickname },
              likeCount,
              dislikeCount,
              content
            } = item || {};
            const isString = typeof content;
            return (
              <CommentsWrapper key={idx}>
                <CommentsBox>
                  <UserComment>
                    {typeof content !== 'string' || content.length === 0
                      ? '앗, 점수는 있는 평가입니다!'
                      : `"${content}"`}
                  </UserComment>
                  <CommentBottom>
                    <LikeBox>
                      <Up>
                        <UpIcon width={20} height={20} />
                        <UpText>{likeCount}</UpText>
                      </Up>
                      <Down>
                        <DownIcon width={20} height={20} />
                        <DownText>{dislikeCount}</DownText>
                      </Down>
                    </LikeBox>
                    <DateWrapper>
                      <UserName>{nickname}</UserName>
                      <Date>{'2024-11-24'}</Date>
                    </DateWrapper>
                  </CommentBottom>
                </CommentsBox>
              </CommentsWrapper>
            );
          })}
        </>
      )}
    </Wrapper>
  );
};

export default UserComments;

const Plz = styled.span`
  margin-top: 5px;
  font-size: 1rem;
  color: #666;
  @media (max-width: 768px) {
    font-size: 0.85rem;
    letter-spacing: 0.5px;
  }
`;
const PlzText = styled.div`
  text-align: center;
  padding: 10px 30px;
  padding-bottom: 15px;
  background-color: #222;
  border-radius: 50px;
  color: #fff;
`;
const NotFoundBox = styled.div`
  box-sizing: border-box;
  margin-top: 30px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NotFound = styled.div`
  text-align: center;
  padding: 10px 30px;
  background-color: #222;
  border-radius: 50px;
  color: #fff;
`;
const Wrapper = styled.div`
  width: 95%;
  padding: 0 0.7rem;
  padding-bottom: 2rem;
  background-color: #fff;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 5rem;
`;

const Contour = styled.div`
  margin: 0 auto;
  width: 100%;
  height: 2px;
  background-color: #ededed;
  margin-bottom: 2rem;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  color: #222; /* 글씨 색상 */
  font-size: 1.25rem; /* 제목 크기 약간 키우기 */
  font-weight: 600; /* 약간의 텍스트 강조 */
  flex: 1; /* 제목이 공간을 차지하게 */
  margin-left: 0.5rem; /* 아이콘과 제목 간격 */
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconWrap = styled.div`
  font-size: 1.5rem; /* 아이콘 크기 조정 */
`;

const CommentsWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 2rem;
`;

// 136,0,251,0.3
const CommentsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 1.5rem;
  border-radius: 24px;
  background-color: rgba(136, 0, 251, 0.04);
  box-shadow: rgba(136, 0, 251, 0.2) 0px 3px 8px;
`;

const UserComment = styled.div`
  color: #333;
  font-size: 1.125rem;
  font-weight: 400;
  letter-spacing: 0.4px;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  @media (max-width: 768px) {
    font-size: 1rem;
    letter-spacing: 0.5px;
  }
`;

const CommentBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-left: 0.5rem;
`;
const LikeBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  font-size: 0.8rem;
  align-items: center;
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; /* align-self 대신 align-items 사용 */
  gap: 0.6rem; /* 적당한 간격 설정 */
  font-size: 0.85rem; /* 약간 키운 폰트 크기 */
  color: #333; /* 텍스트 색상 강조 */
`;

const UserName = styled.div`
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;
const Date = styled.div`
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const Up = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Down = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const UpText = styled.span`
  font-size: 0.875rem; /* 적당한 기본 폰트 크기 */
  color: #555; /* 텍스트 가독성을 위한 부드러운 색상 */
  font-weight: 500; /* 텍스트 강조 */
  margin-left: 0.25rem; /* 텍스트와 아이콘 사이 여백 */
`;

const DownText = styled.span`
  font-size: 0.875rem; /* 적당한 기본 폰트 크기 */
  color: #555; /* 텍스트 가독성을 위한 부드러운 색상 */
  font-weight: 500; /* 텍스트 강조 */
  margin-left: 0.25rem; /* 텍스트와 아이콘 사이 여백 */
`;

const Span = styled.span`
  margin-top: 3px;
  color: #b483dd;
  font-size: 0.9rem;
`;
