import styled from 'styled-components';
import { Vips, VipRatings } from '@/constants/Main/index';
import { findParty } from '@/constants/Main/Constants';

interface ProfileProps {
  vipData: Vips;
  ratings: VipRatings;
}

const Profile: React.FC<ProfileProps> = ({ vipData, ratings }) => {
  const { congressmanList } = vipData;
  const { name, party, rate } = congressmanList[0] || {};
  const isParty = findParty(party);
  const { ratingList } = ratings || {};
  const count = ratingList?.length || 0;

  return (
    <ProfileCard>
      <InfoSection>
        <ImageSection>
          <ProfileImage
            src="/test/main2.jpg"
            alt={`${name} 의원 프로필 사진`}
          />
        </ImageSection>
        <BoxWrap>
          <BadgeWrap>
            <PartyBadge>{isParty}</PartyBadge>
          </BadgeWrap>
          <CongressmanName>
            {name || ''}
            <CongressmanTitle> 의원</CongressmanTitle>
          </CongressmanName>
        </BoxWrap>
        <RatingSection>
          <RatingScore>
            <RatingStars>
              <Star filled={true} />
            </RatingStars>
            {rate?.toFixed(1)}
            <ScoreUnit>/ 10.0</ScoreUnit>
            <RatingCount>({count}명 평가)</RatingCount>
          </RatingScore>
        </RatingSection>
      </InfoSection>
    </ProfileCard>
  );
};

export default Profile;

const BoxWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
const ProfileCard = styled.div`
  display: flex;
  background-color: #ffffff;
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  width: 95%;
  max-width: 700px;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 500px;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

const InfoSection = styled.div`
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  padding-top: 10px;
  background-color: #fafafa;
`;

const BadgeWrap = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const PartyBadge = styled.div`
  background-color: #4a90e2;
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-top: 1.1rem;
  @media (max-width: 768px) {
    padding: 5px 10px;
  }
`;

const CongressmanName = styled.h2`
  color: #2c3e50;
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  letter-spacing: 0.5px;
`;

const CongressmanTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: #7f8c8d;
`;

const RatingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RatingStars = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  display: flex;
  padding: 0;
  margin-right: 5px;
  margin-top: 5px;
`;

const Star = styled.span<{ filled: boolean }>`
  color: ${(props) => (props.filled ? '#f1c40f' : '#bdc3c7')};
  font-size: 1.5rem;
  margin-right: 5px;

  &::before {
    content: '★';
  }
`;

const RatingScore = styled.span`
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const ScoreUnit = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: #7f8c8d;
  margin-left: 5px;
  margin-top: 5px;
`;

const RatingCount = styled.span`
  color: #95a5a6;
  font-size: 1rem;
  font-weight: 500;
  margin-left: 5px;
  margin-top: 6px;
`;

// const Span = styled.div`
//   width: 100%;
//   color: #555;
//   margin-top: -10px;
//   font-size: 1rem;
//   font-weight: bold;
//   text-align: center;
//   background-color: #f0f0f0;
//   border-radius: 10px;
//   padding: 5px 10px;
//   display: inline-block;
//   box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
// `;

// import styled from 'styled-components';
// import { Vips, VipRatings } from '@/constants/Main/index';
// import { findParty } from '@/constants/Main/Constants';

// interface ProfileProps {
//   vipData: Vips;
//   ratings: VipRatings;
// }

// const Profile: React.FC<ProfileProps> = ({ vipData, ratings }) => {
//   const { congressmanList } = vipData;
//   const { name, party, rate } = congressmanList[0] || {};
//   const isParty = findParty(party);
//   const { ratingList } = ratings || {};
//   const count = ratingList?.length || 0;

//   return (
//     <ProfileCard>
//       <ImageSection>
//         <ProfileImage src="/test/main2.jpg" alt={`${name} 의원 프로필 사진`} />
//       </ImageSection>
//       <InfoSection>
//         <PartyBadge>{isParty}</PartyBadge>
//         <CongressmanName>
//           {name || ''}
//           <CongressmanTitle> 의원</CongressmanTitle>
//         </CongressmanName>
//         <RatingSection>
//           <RatingStars>
//             {[1, 2, 3, 4, 5].map((star) => (
//               <Star key={star} filled={star <= Math.round(rate)} />
//             ))}
//           </RatingStars>
//           <RatingScore>
//             {rate?.toFixed(1)}
//             <ScoreUnit>
//               / 5.0 <RatingCount>({count}명 평가)</RatingCount>
//             </ScoreUnit>
//           </RatingScore>
//         </RatingSection>
//       </InfoSection>
//     </ProfileCard>
//   );
// };

// export default Profile;

// const ProfileCard = styled.div`
//   display: flex;
//   background-color: #ffffff;
//   border-radius: 30px;
//   box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//   margin: 2rem auto;
//   width: 95%;
//   max-width: 700px;
//   overflow: hidden;
//   transition: all 0.3s ease;

//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
//   }
// `;

// const ImageSection = styled.div`
//   flex: 1;
//   padding: 30px;
// `;

// const ProfileImage = styled.img`
//   width: 100%;
//   height: auto;
//   border-radius: 20px;
//   object-fit: cover;
// `;

// const InfoSection = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 40px;
//   background: linear-gradient(135deg, #f8f9fa, #e9ecef);
// `;

// const PartyBadge = styled.span`
//   background-color: #4a90e2;
//   color: white;
//   padding: 5px 15px;
//   border-radius: 20px;
//   font-size: 0.9rem;
//   font-weight: 600;
//   align-self: flex-start;
//   margin-bottom: 1rem;
// `;

// const CongressmanName = styled.h2`
//   color: #2c3e50;
//   font-size: 2.2rem;
//   font-weight: 700;
//   margin-bottom: 1.5rem;
//   letter-spacing: 0.5px;
// `;

// const CongressmanTitle = styled.span`
//   font-size: 1.2rem;
//   font-weight: 500;
//   color: #7f8c8d;
// `;

// const RatingSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   margin-top: 1rem;
// `;

// const RatingStars = styled.div`
//   display: flex;
//   margin-bottom: 0.5rem;
// `;

// const Star = styled.span<{ filled: boolean }>`
//   color: ${(props) => (props.filled ? '#f1c40f' : '#bdc3c7')};
//   font-size: 1.5rem;
//   margin-right: 5px;

//   &::before {
//     content: '★';
//   }
// `;

// const RatingScore = styled.span`
//   color: #2c3e50;
//   font-size: 1.8rem;
//   font-weight: 700;
// `;

// const ScoreUnit = styled.span`
//   font-size: 1.2rem;
//   font-weight: 500;
//   color: #7f8c8d;
//   margin-left: 5px;
// `;

// const RatingCount = styled.span`
//   color: #95a5a6;
//   font-size: 1rem;
//   font-weight: 500;
//   margin-left: 5px;
// `;
