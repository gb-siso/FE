import styled from 'styled-components';

const News = () => {
  return (
    <Wrapper>
      <TitleWrapper>
        <NewsTitle>🧾 News</NewsTitle>
      </TitleWrapper>
      <NewsWrap>
        <NewsImage src="/test/group.png" />
      </NewsWrap>
    </Wrapper>
  );
};

export default News;

const Wrapper = styled.div`
  width: 95%;
  padding: 0 1rem;
  padding-bottom: 2rem;
  background-color: #fff;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 1rem;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid #ddd;
  border-radius: 12px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
`;

const NewIcon = styled.img`
  width: 1.2rem;
  height: 1.2rem;
`;
const NewsTitle = styled.p`
  color: #080a0b;
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 20px;
`;

const NewsWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NewsImage = styled.img``;
