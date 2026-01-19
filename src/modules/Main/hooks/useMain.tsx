import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { isLoadingAtom } from '@/atoms/atom';
import { getVipListAtom, partyAtom, updatePartyAtom, vipsAtom } from '../atom';
import { Vips } from '@/constants/Main/index';

const SCROLL_STORAGE_KEY = 'mainScrollPosition';

interface UseMainProps {
  data: Vips;
  party?: string | null;
}

interface Iquery {
  party?: string;
}

export const useMain = ({ data, party: initialParty }: UseMainProps) => {
  const router = useRouter();
  const searchParams = router.query;
  const lineRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);

  // ATOM
  const [vips, setVips] = useAtom(vipsAtom);
  const isLoading = useAtomValue(isLoadingAtom);
  const getVipList = useSetAtom(getVipListAtom);
  const updateParty = useSetAtom(updatePartyAtom);
  const party = useAtomValue(partyAtom);

  // 서버에서 받은 초기 데이터를 atom에 설정 (한 번만 실행)
  if (!isInitializedRef.current && data) {
    setVips(data);

    if (initialParty) {
      updateParty(initialParty);
    }

    isInitializedRef.current = true;
  }

  // 스크롤 위치 복원
  useEffect(() => {
    const savedY = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    if (savedY) {
      window.scrollTo(0, Number(savedY));
    }
  }, []);

  // 무한 스크롤
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          if (vips.lastPage) return;

          const query: {
            idCursor?: string;
            rateCursor?: string;
            party?: string;
          } = {};

          if (vips.idCursor) query.idCursor = vips.idCursor;
          if (vips.rateCursor) query.rateCursor = vips.rateCursor;

          const partyParam =
            typeof searchParams.party === 'string' ? searchParams.party : null;
          if (partyParam) {
            query.party = partyParam;
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
  }, [isLoading, vips, searchParams, getVipList]);

  // party 변경 시 데이터 재조회
  useEffect(() => {
    if (isInitializedRef.current && party !== initialParty) {
      const query: Iquery = {};
      if (party) query.party = party;

      getVipList({ query, merge: false });
    }
  }, [party, initialParty, getVipList]);

  // 클릭 핸들러
  const handleClick = () => {
    sessionStorage.setItem(SCROLL_STORAGE_KEY, window.scrollY.toString());
  };

  return {
    vipList: vips.congressmanList,
    party,
    isLoading,
    lineRef,
    handleClick
  };
};
