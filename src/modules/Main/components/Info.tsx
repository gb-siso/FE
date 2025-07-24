import styled from 'styled-components';

const Info = ({ vip }: { vip: any }) => {
  const { electoralDistrict, assemblySessions, name, party } = vip;

  const city = electoralDistrict?.split('/')?.pop() || '';
  const currentParty = party?.split('/')?.pop() || '';

  return (
    <PoliticianInfo>
      <VipImgWrap>
        <Badge src="/test/badge.png" />
      </VipImgWrap>
      <VipRightBox>
        <VipInfoWrap>
          <VipName>{name}</VipName>
          <VipLocation>
            {currentParty} / {city}
          </VipLocation>
        </VipInfoWrap>
        <VipCountWrap>
          <VipCount>{assemblySessions.length}회 당선</VipCount>
        </VipCountWrap>
      </VipRightBox>
    </PoliticianInfo>
  );
};

export default Info;

const PoliticianInfo = styled.div`
  display: flex;
  justify-content: start;
  gap: 10px;
  width: 100%;
  padding: 0 1rem;
  padding-right: 0rem;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const VipImgWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Badge = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 2px solid #fff; /* 배경과 대비되는 테두리 추가 */
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2); /* 부드러운 그림자 효과 */
`;

// const VipInfoWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: flex-start;
//   font-family: 'Noto Sans KR', sans-serif;
// `;

const VipName = styled.h4`
  margin: 0;
  padding: 0;
  color: #030303;
  font-size: 1rem;
  font-weight: 700;
  line-height: 24px; /* 줄 간격을 넉넉하게 */
  text-align: left; /* 텍스트 왼쪽 정렬 */
`;

const VipLocation = styled.h5`
  margin: 0;
  padding: 0;
  color: #777;
  font: 0.9rem;
  line-height: 18px;
  text-align: left;
`;

// const VipRightBox = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center; /* 텍스트 정렬을 중앙으로 */
// `;

// const VipCountWrap = styled.div`
//   display: flex;
//   align-items: center;
//   padding-right: 1rem;
//   padding-bottom: 3px;
//   margin-right: 0.5rem;
// `;

const VipCount = styled.h6`
  margin: 0;
  padding: 0;

  color: #333;
  /* font-size: 16px;  */
  font-size: 0.9rem;
  line-height: 20px;
  text-align: right;
  font-weight: 600; /* 두께 증가 */
`;
const VipRightBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;
`;

const VipInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-family: 'Noto Sans KR', sans-serif;
  flex: 1; /* 추가: 가능한 모든 공간 차지 */
  min-width: 0; /* 추가: 텍스트 오버플로우 방지 */
`;

const VipCountWrap = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 3px;
  margin-left: 10px; /* 간격 조절 */
  flex-shrink: 0; /* 추가: 크기 줄어들지 않게 */
`;
