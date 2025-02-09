import { DownIcon, UpIcon } from '@/assets/svg';
import styled from 'styled-components';
const UserComments = () => {
  return (
    <Wrapper>
      <Contour />
      <TextWrapper>
        <IconWrap>💬</IconWrap>
        <Title>시민의 소리 :D</Title>
      </TextWrapper>
      {[1, 2, 3, 4].map((item) => (
        <CommentsWrapper key={item}>
          <CommentsBox>
            <UserComment>
              "
              {
                '계파색이 많이 옅은   정치인이자, 5선 국회의원으로 명실상부 보수 진영의 대표적 중진 정치인이다. 높은 인지도와 명성만큼 논란과 구설수도 있는 정치인이기도 하다.'
              }
              "
            </UserComment>
            <CommentBottom>
              <LikeBox>
                <Up>
                  <UpIcon width={20} height={20} />
                  <UpText>10</UpText>
                </Up>
                <Down>
                  <DownIcon width={20} height={20} />
                  <DownText>4000</DownText>
                </Down>
              </LikeBox>
              <DateWrapper>
                <UserName>제갈관영</UserName>
                <Date>2024-11-24</Date>
              </DateWrapper>
            </CommentBottom>
          </CommentsBox>
        </CommentsWrapper>
      ))}
    </Wrapper>
  );
};

export default UserComments;

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
  color: #333; /* 약간 더 부드러운 색상으로 조정 */
  font-size: 1.125rem; /* 조금 더 큰 기본 크기 */
  font-weight: 400;
  letter-spacing: 0.4px; /* 너무 넓지 않은 자연스러운 간격 */
  line-height: 1.8; /* 가독성을 위한 충분한 줄 간격 */
  margin-bottom: 1.5rem; /* 요소 간의 간격 추가 */
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

const UserName = styled.div``;
const Date = styled.div``;

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
