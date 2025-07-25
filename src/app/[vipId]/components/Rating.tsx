import Button from '@/components/Button/Button';
import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

const Rating = () => {
  const [isOpen, setIsopen] = useState(false);
  const [rating, setRating] = useState(5);

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(parseFloat(e.target.value));
  };

  return (
    <Wrapper>
      <ButtonWrapper onClick={() => setIsopen(true)}>
        <TitleWrapper>
          ✍🏻 <Title>국회의원 평가</Title>
        </TitleWrapper>
        {!isOpen && <Button name="Go" size="s" />}
      </ButtonWrapper>
      {isOpen && (
        <MainSection>
          <ScoreWrap>
            <StarImg src="/test/iconStar.png" />
            <Span>별점 : </Span>
            <Score>{rating} / 10</Score>
          </ScoreWrap>
          <ScoreRadio
            type="range"
            min="1"
            max="10"
            step="0.1"
            value={rating}
            onChange={handleSliderChange}
            style={{ width: '100%', marginBottom: '20px' }}
          />
          <TextAreaWrapper>
            <TextArea placeholder="자유롭게 작성해주세요." />
            <SubmitBtnWrapper>
              <Button
                name="닫기"
                bg="#00ba5c"
                size="m"
                onClick={() => setIsopen(false)}
              />
              <Button name="전송" bg="#8800fb" size="m" />
            </SubmitBtnWrapper>
          </TextAreaWrapper>
        </MainSection>
      )}
    </Wrapper>
  );
};

export default Rating;

const Span = styled.span``;
const StarImg = styled.img`
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 10px;
`;
const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  background-color: #8800fb;
  border-radius: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ededed;
  border-radius: 12px;
  margin: 0 auto;
  margin-top: 1rem;
  width: 95%;
  padding: 0 1.5rem;
  flex-direction: column;
  padding-bottom: 2rem;
  background-color: #ffffff;
  border-radius: 17px;
  padding: 1rem;
  cursor: pointer;
`;

const Title = styled.p`
  color: #000000;
  font-size: 20px;
  font-weight: 500;
  flex: 1;
  margin-left: 0.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ScoreWrap = styled.div`
  color: #8800fb;
  font-weight: 700;
  margin-top: 1rem;
`;
const Score = styled.span``;

const ScoreRadio = styled.input.attrs({ type: 'range' })`
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  margin-bottom: 20px;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 15px;
    background: #d8b4ff;
    border-radius: 5px;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 25px;
    height: 25px;
    background: #8800fb;
    border-radius: 50%;
    cursor: pointer;
    margin-top: -5.5px;
  }

  &::-moz-range-track {
    width: 100%;
    height: 8px;
    background: #d8b4ff;
    border-radius: 5px;
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #6c63ff;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TextAreaWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 8rem;
  box-sizing: border-box;
  font-size: 1rem;
  border: none; /* 기본 보더 제거 */
  outline: none;
  padding: 1rem;
  box-shadow: 0px 0px 4px rgba(3, 3, 3, 0.2);

  &::placeholder {
    color: #cbb3e5;
  }
`;

const SubmitBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const Pen = styled.img`
  display: block;
  width: 20px;
  height: 20px;
`;
