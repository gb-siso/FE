import styled from 'styled-components';
import Link from 'next/link';
export const RatingSpan = styled.span`
  font-weight: 500;
  font-size: 0.8rem;
  padding-bottom: 10px;
  margin-left: 2px;
`;

export const Wrapper = styled.div`
  width: 100%;
  background-color: #fff;
  padding: 2rem;
  padding-top: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-bottom: 10rem;
  @media screen and (max-width: 768px) {
    gap: 1.2rem;
  }
`;

export const ButtonWrap = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: end;
  box-sizing: border-box;
  padding: 0 1.5rem;
  padding-top: 2rem;
`;

export const Card = styled.div<{ $isClick: boolean }>`
  position: relative;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  pointer-events: ${({ $isClick }) => ($isClick ? 'none' : 'auto')};
  cursor: pointer;

  &:after {
    content: '';
    display: ${({ $isClick }) => ($isClick ? 'block' : 'none')};
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: loading 0.8s infinite;
    @keyframes loading {
      100% {
        transform: translateX(100%);
      }
    }
  }
`;

export const VipCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  border-radius: 24px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden; /* 둥근 모서리에 맞게 이미지 자르기 */
  padding-bottom: 0;
`;

// export const VipImg = styled.img`
//   width: 100%;
//   height: auto;
//   object-fit: cover;
// `;

export const EvaluationBox = styled.div`
  width: 98%;
  background-color: #ead5fb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 2rem;
  box-sizing: border-box;
  margin: 0 auto;
  border-radius: 24px;
  margin-top: -2.1rem;
  padding-left: 1rem;
  position: relative;
`;

export const UsersBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  width: 60%;
  position: relative;
`;
export const User = styled.div<{ $index: number }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  left: ${({ $index }) => `${$index * 20}px`};
`;

export const UserImg = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: inherit;
`;

export const RatingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
export const Rating = styled.img`
  width: 35px;
  height: 35px;
  height: auto;
  object-fit: cover;
  border-radius: inherit;
  padding-top: 5px;
`;
export const RatingNumber = styled.span`
  color: #8800fb;
  font-size: 1.3rem;
  text-align: right;
  text-decoration: none;
  font-weight: 700;
`;

export const StyledLink = styled(Link)`
  text-decoration: none; // 아래줄 없애기
`;

export const Line = styled.div`
  padding: 5px;
  height: 1px;
`;
