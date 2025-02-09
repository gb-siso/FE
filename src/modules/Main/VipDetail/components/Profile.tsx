import styled from 'styled-components';
import { Vips } from '@/constants/Main/index';
import { findParty } from '@/constants/Main/Constants';

interface ProfileProps {
  vipData: Vips;
}
const Profile: React.FC<ProfileProps> = ({ vipData }) => {
  const { congressmanList } = vipData;
  const { name, party, rate } = congressmanList[0] || [];
  const isParty = findParty(party);
  return (
    <ProfileWrapper>
      <ImageContainer>
        <ProfileImage src="/test/main2.jpg" alt="Profile Image" />
      </ImageContainer>
      <Description>
        <InfoWrapper>
          <Name>{name || ''}</Name>
          <Location>{isParty}</Location>
        </InfoWrapper>
        <RatingSection>
          <RatingIcon src="/test/iconStars.png" alt="Rating Stars" />
          <RatingScore>
            {rate} <ScoreUnit>점</ScoreUnit>
          </RatingScore>
        </RatingSection>
      </Description>
    </ProfileWrapper>
  );
};

export default Profile;

const ProfileWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  margin-top: 1rem;
  width: 95%;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 6;
  border-radius: 24px;
  padding: 20px;
  padding-left: 0;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 40px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  flex: 4;
  padding-top: 4rem;
  align-items: flex-start;
  gap: 20px;
  @media (min-width: 768px) {
    align-items: center;
    padding-top: 7rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const Name = styled.h4`
  margin: 0;
  padding: 0;
  color: #222;
  font-weight: 700;
  letter-spacing: 0.8px;
  line-height: 20px;
  font-size: 2rem;
`;

const Location = styled.h5`
  margin: 3px;
  padding: 0;
  color: #888;
  line-height: 18px;
  font-size: 14px;
  font-weight: 500;
`;

const RatingSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RatingIcon = styled.img`
  width: 45px;
  height: 45px;
  padding-top: 5px;
  margin-left: -0.8rem;
`;

const RatingScore = styled.span`
  color: #8800fb;
  font-size: 1.8rem;
  font-weight: 500;
`;

const ScoreUnit = styled.span`
  font-size: 1rem;
  font-weight: 500;
  padding-left: 10px;
`;
