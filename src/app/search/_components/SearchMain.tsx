'use client';

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { ActiveHomeIcon } from '@/assets/svg';
import useHandler from '@/app/hooks/useHandler';
import { getVipListAtom } from '@/modules/Main/atom';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { Vip } from '@/constants/Main/index';
import Spinner from '@/app/_components/Spinner';

const SearchMain = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Vip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const router = useRouter();
  const getVipList = useSetAtom(getVipListAtom);

  // 임시 검색 함수 (실제로는 API 호출로 대체)
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  const { isLoading: searchLoading, handler: searchHandler } = useHandler(
    async () => {
      try {
        setIsLoading(true);
        if (abortControllerRef.current) {
          abortControllerRef.current.abort(); // 이전 요청 취소
        }

        abortControllerRef.current = new AbortController();

        // 실제 API 호출로 대체 필요
        const res = await getVipList({ query: { search: query } });

        setResults(res?.congressmanList);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('검색 에러:', err);
          setResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    }
  );

  // 디바운싱된 검색 핸들러
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      searchHandler();
    }, 300);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query]);

  return (
    <Container>
      <Form onSubmit={handleSearch}>
        <SearchBox>
          <HomeLink href="/" title="홈으로 이동">
            <ActiveHomeIcon fill="#8800fb" />
          </HomeLink>
          <Input
            type="text"
            placeholder="국회의원 이름을 입력해주세요:D"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" hidden />
        </SearchBox>
      </Form>
      {isLoading && (
        <>
          <Spinner title="잠시만 기다려주세요!" />
        </>
      )}
      {!isLoading && (
        <ResultList>
          {results.length !== 0 && (
            <ResultCount>
              <span className="highlight">{results.length}</span>명의 국회의원을
              찾았습니다
              <SearchIcon>🔍</SearchIcon>
            </ResultCount>
          )}
          {results.map((vip: any, index: number) => {
            const { assemblySessions, electoralDistrict, party } = vip;
            const city = electoralDistrict?.split('/')?.pop() || '';
            const lastParty = party?.split('/')?.pop() || '';
            return (
              <ResultItem
                key={index}
                onClick={() => {
                  router.push(`/${vip.name}`);
                }}
              >
                <ImgWrap>
                  <StyledImage src={vip.imageUrl} />
                </ImgWrap>
                <VipInfo>
                  <NameRow>
                    <Name>{vip.name}</Name>
                    <WinCount>당선 {assemblySessions?.length || ''}회</WinCount>
                  </NameRow>
                  <Party>
                    {lastParty} / {city}
                  </Party>
                  <District>{vip.district}</District>
                </VipInfo>
              </ResultItem>
            );
          })}
          {results.length === 0 && (
            <NullItem>
              검색 결과가 없습니다 <SearchIcon>🔍</SearchIcon>
            </NullItem>
          )}
        </ResultList>
      )}
    </Container>
  );
};

export default SearchMain;

const VipInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
`;

const NameRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1rem;
`;

const Name = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #333;
`;

const Party = styled.span`
  font-size: 0.9rem;
  color: #666;
  padding: 0.2rem 0.5rem;
  background: #f3f3f3;
  border-radius: 4px;
  width: fit-content;
`;

const District = styled.span`
  font-size: 0.95rem;
  color: #444;
`;

const WinCount = styled.span`
  font-size: 0.9rem;
  color: #8800fb;
  font-weight: 500;
  padding: 0.15rem 0.7rem;
  border: 1px solid #8800fb;
  border-radius: 12px;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
  margin-bottom: 5rem;
`;

const Form = styled.form``;

const InputWrapper = styled.div`
  width: 100%;
`;

const HomeLink = styled(Link)`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 2;
  text-decoration: none;
  width: 50px;
  height: 50px;

  cursor: pointer;
  transition: transform 0.2s;
  */ &:hover {
    transform: scale(1.1);
  }
`;

const HomeIcon = styled.div`
  width: 100%;
  font-size: 30px;
  margin-top: -10px;
  color: #8800fb;
  transition: color 0.2s;
  text-decoration: none;
  ${HomeLink}:hover & {
    color: #6a00c7;
  }
`;

const SearchBox = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #b879eb;
  }
`;

const ResultList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ResultItem = styled.li`
  display: flex;
  gap: 1rem;
  padding: 10px;
  border-radius: 8px;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    /* background-color: #fff5f5; */
    background-color: #faf4fe;
  }
`;

const NullItem = styled.li`
  display: flex;
  gap: 1rem;
  padding: 0.8rem 1.2rem;
  border-radius: 8px;
  transition: transform 0.2s;
  cursor: pointer;
  background-color: #fafafa;

  &:hover {
    /* background-color: #fff5f5; */
    background-color: #faf4fe;
  }
`;

const ImgWrap = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 5px;
  object-fit: cover;
  object-position: top;
`;

const ResultCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  margin-bottom: 1.5rem;
  background-color: #f8f4ff;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #555;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  .highlight {
    color: #8800fb;
    font-weight: 700;
    font-size: 1.1em;
    margin: 0 0.2em;
  }
`;

const SearchIcon = styled.span`
  margin-left: auto;
  font-size: 1.2rem;
  opacity: 0.7;
`;
