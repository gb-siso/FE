import styled from 'styled-components';

const Profile = () => {
  return (
    <Wrapper>
      <VipProfileImgWrap>
        <VipImg src="/test/main2.jpg" />
      </VipProfileImgWrap>
      <Desc>
        <VipInfoWrap>
          <VipName>나경원</VipName>
          <VipLocation>국민의힘</VipLocation>
        </VipInfoWrap>
        <RatingBox>
          <Rating src="/test/iconStars.png" />
          <RatingNumber>
            3.5 <RatingSpan>점</RatingSpan>
          </RatingNumber>
        </RatingBox>
      </Desc>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  margin-top: 1rem;
  width: 95%;
`;

const VipProfileImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 6;
  border-radius: 24px;
  padding: 20px;
  padding-left: 0;
`;

const VipImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 40px;
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  padding-top: 4rem;
  align-items: start;
  gap: 20px;
`;

const VipCountWrap = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  padding-right: 1rem;
  padding-bottom: 3px;
  margin-right: 0.5rem;
`;
const VipCount = styled.h6`
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 14px;
  line-height: 18px;
  text-align: right;
  font-weight: 500;
`;

const VipInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const VipName = styled.h4`
  margin: 0;
  padding: 0;
  color: #222;
  font-weight: 700;
  letter-spacing: -1px;
  line-height: 20px;
  font-size: 2rem;
`;
const VipLocation = styled.h5`
  margin: 3px;
  padding: 0;
  color: #888;
  line-height: 18px;
  font-size: 14px;
  font-weight: 500;
`;

const RatingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Rating = styled.img`
  width: 45px;
  height: 45px;
  height: auto;
  padding-top: 5px;
  margin-left: -0.8rem;
`;

const RatingNumber = styled.span`
  color: #8800fb;
  font-size: 1.8rem;
  text-align: right;
  text-decoration: none;
  font-weight: 500;
`;

const RatingSpan = styled.span`
  font-weight: 500;
  font-size: 1rem;
  padding-bottom: 10px;
`;
