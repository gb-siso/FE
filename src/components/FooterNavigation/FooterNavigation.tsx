'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import {
  HOME,
  COMMUNITY,
  Notifications,
  LOGIN,
  MY_PAGE,
  SEARCH
} from '@/utils/route';
import {
  ActiveHome,
  ActiveHomes,
  Activesearch,
  ActiveUser,
  SisoHome,
  SisoSearch,
  SisoUser
} from '@/assets/svg';
import { atom, useAtom, useAtomValue } from 'jotai';
import { isLoadingAtom } from '@/atoms/atom';
import './styles.css';
import Image from 'next/image';
import { accessTokenAtom } from '@/modules/auth/atoms';

export default function FooterNavigation() {
  const path = usePathname();

  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const accessToken = useAtomValue(accessTokenAtom);
  const isLogin = accessToken !== '';

  const isActive = (url: string[]) => {
    return url.some((item) => item === path);
  };

  useEffect(() => {
    const loadingState = sessionStorage.getItem('siso');

    if (loadingState === 'true') {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('siso', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [setIsLoading]);

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="text-wrapper">
          <h1 className="title">SISO</h1>
          <h2 className="description">시민의 소리!</h2>
        </div>
        <div className="puppy-wrapper">
          <Image
            src="/puppy.png"
            alt="A cute puppy"
            width={500}
            height={300}
            layout="intrinsic"
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <Footer className="footer-nav">
        <StyledLink href={HOME}>
          <IconWrap>
            {isActive([HOME, COMMUNITY]) ? (
              <ActiveHome width={25} height={25} />
            ) : (
              <SisoHome width={25} height={25} />
            )}
            <Text>홈</Text>
          </IconWrap>
        </StyledLink>
        <StyledLink href={SEARCH}>
          <IconWrap>
            {isActive([SEARCH]) ? (
              <Activesearch width={25} height={25} />
            ) : (
              <SisoSearch width={25} height={25} />
            )}
            <Text>검색</Text>
          </IconWrap>
        </StyledLink>
        {!isLogin && (
          <StyledLink href={LOGIN}>
            <IconWrap>
              {isActive([LOGIN]) ? (
                <ActiveUser width={25} height={25} />
              ) : (
                <SisoUser width={25} height={25} />
              )}
              <Text>로그인</Text>
            </IconWrap>
          </StyledLink>
        )}
        {isLogin && (
          <StyledLink href={MY_PAGE}>
            <IconWrap>
              {isActive([MY_PAGE]) ? (
                <ActiveUser width={25} height={25} />
              ) : (
                <SisoUser width={25} height={25} />
              )}
              <Text>내정보</Text>
            </IconWrap>
          </StyledLink>
        )}
      </Footer>
    </>
  );
}
const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  text-align: center;
  width: 25%;
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;
  text-align: center;

  @media (max-width: 768px) {
    padding: 0;
    padding-top: 3px;
  }
`;

const Footer = styled.footer`
  position: fixed;
  z-index: 15;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #444;
  font-weight: bold;
  gap: 2px;
  font-size: 1rem;

  @media (max-width: 768px) {
    & > svg {
      padding: 5px 0;
      width: 22px;
      height: 22px;
    }
  }
`;

const Text = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
