import React from 'react';
import Info from './components/Info';
import * as Vip from './component.styles';
import FilterComponent from './components/FilterComponent';
import VipImg from './VipDetail/components/VipImg';
import { Vips } from '@/constants/Main/index';
import { useMain } from './hooks/useMain';

interface MainProps {
  data: Vips;
  party?: string | null;
}

const Main: React.FC<MainProps> = ({ data, party }) => {
  const {
    // 의원 리스트
    vipList,
    //
    party: selected,
    // 로딩 상태
    isLoading,
    // 라인 참조
    lineRef,
    handleClick
  } = useMain({
    data,
    party
  });

  if (isLoading) {
    return <></>;
  }

  return (
    <Vip.Wrapper>
      <FilterComponent selected={selected} />
      <Vip.Section>
        {vipList.map((vip, idx) => {
          const { name, rate } = vip;
          return (
            <Vip.Card key={idx} onClick={handleClick}>
              <Vip.StyledLink href={`/${name}`}>
                <Vip.VipCard>
                  <Info vip={vip} />
                  <VipImg src={vip?.imageUrl} />
                </Vip.VipCard>
                <Vip.EvaluationBox>
                  <Vip.UsersBox>
                    {[1, 2, 3, 4].map((src, idx) => (
                      <Vip.User key={idx} $index={idx}>
                        <VipImg src={`/test/${src}.png`} radius />
                      </Vip.User>
                    ))}
                  </Vip.UsersBox>
                  <Vip.RatingBox>
                    <Vip.Rating src="/test/iconStar3.png" />
                    <Vip.RatingNumber>
                      {rate && (
                        <>
                          {rate?.toFixed(1)}
                          <Vip.RatingSpan>점</Vip.RatingSpan>
                        </>
                      )}
                    </Vip.RatingNumber>
                  </Vip.RatingBox>
                </Vip.EvaluationBox>
              </Vip.StyledLink>
            </Vip.Card>
          );
        })}
      </Vip.Section>

      <Vip.Line ref={lineRef} />
    </Vip.Wrapper>
  );
};

export default Main;
