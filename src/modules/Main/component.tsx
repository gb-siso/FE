'use client';
import { isLoadingAtom } from '@/atoms/atom';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import Info from './components/Info';

import { getVipListAtom, partyAtom, updatePartyAtom, vipsAtom } from './atom';
import Spinner from '@/app/_components/Spinner';
import * as Vip from './component.styles';
import FilterComponent from './components/FilterComponent';

import VipImg from './VipDetail/components/VipImg';

const SCROLL_STORAGE_KEY = 'mainScrollPosition';

const Main: React.FC = () => {
  const searchParams = useSearchParams();

  const lineRef = useRef<HTMLDivElement>(null);

  // ATOM
  const [vips, setVips] = useAtom(vipsAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  const getVipList = useSetAtom(getVipListAtom);

  // 필터
  const party = useAtomValue(partyAtom);

  // state
  const [isClick, setIsClick] = useState(false);

  const { congressmanList } = vips;

  // 클릭 했을 때 동작.
  const handleClick = (idx: number) => {
    setIsClick(true);
    sessionStorage.setItem(SCROLL_STORAGE_KEY, window.scrollY.toString());
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          // 마지막 페이지면 아무것도 하지마
          if (vips.lastPage) return;
          const query: {
            idCursor?: string;
            rateCursor?: string;
            party?: string;
          } = {};

          if (vips.idCursor) query.idCursor = vips.idCursor;
          if (vips.rateCursor) query['rateCursor'] = vips.rateCursor;

          const party = searchParams.get('party');
          if (party) {
            query.party = party;
          }

          await getVipList({ query });
        }
      },
      {
        threshold: 1.0
      }
    );

    if (lineRef.current) {
      observer.observe(lineRef.current);
    }

    return () => {
      if (lineRef.current) {
        observer.unobserve(lineRef.current);
      }
    };
  }, [isLoading, vips, searchParams]);

  useEffect(() => {
    const savedY = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    if (savedY) {
      window.scrollTo(0, Number(savedY));
    }
  }, []);

  const httpGetList = async () => {
    const query: { party?: string } = {};
    if (party) query.party = party;
    await getVipList({ query, merge: false });
  };

  useEffect(() => {
    httpGetList();
  }, [party]);

  if (isLoading) {
    return <></>;
  }

  return (
    <Vip.Wrapper>
      <FilterComponent selected={party} />
      <Vip.Section>
        {congressmanList.map((vip, idx) => {
          const { name, rate } = vip;
          return (
            <Vip.Card
              key={idx}
              $isClick={isClick}
              onClick={() => handleClick(idx)}
            >
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
                        {/* <VipImg
                        src={`https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`}
                      /> */}
                        {/* <Vip.UserImg
                        src={`https://picsum.photos/200/200?random=${Math.floor(Math.random() * 1000)}`}
                      /> */}
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

      {isLoading && <Spinner />}
      <Vip.Line ref={lineRef} />
    </Vip.Wrapper>
  );
};

export default Main;
