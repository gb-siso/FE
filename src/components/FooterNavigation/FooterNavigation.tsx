'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { HOME, Notifications, LOGIN, MY_PAGE } from '@/utils/route';
import { ActiveHomeIcon, HomeIcon, User } from '@/assets/svg';
import { atom, useAtom, useAtomValue } from 'jotai';
import { isLoadingAtom } from '@/atoms/atom';
import './styles.css';
import Image from 'next/image';
import { accessTokenAtom } from '@/modules/auth/atoms';

export default function FooterNavigation() {
  const path = usePathname();

  const isLogin =
    typeof window !== 'undefined' &&
    localStorage.getItem('cookieData') !== 'null';

  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  const isActive = (url: string) => {
    return path.includes(url);
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('cookieData') || '';

      if (token && token !== 'null') {
        setAccessToken(token);
      }
    }
  }, [accessToken]);
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
          <span>
            {path !== LOGIN && path !== MY_PAGE ? (
              <ActiveHomeIcon />
            ) : (
              <HomeIcon />
            )}
          </span>
        </StyledLink>
        {!isLogin && (
          <StyledLink href={LOGIN}>
            {isActive(LOGIN) ? <User /> : <User fill="#a8a8a8" />}
          </StyledLink>
        )}
        {isLogin && (
          <StyledLink href={MY_PAGE}>
            {isActive(MY_PAGE) ? <User /> : <User fill="#a8a8a8" />}
          </StyledLink>
        )}
      </Footer>
    </>
  );
}
const StyledLink = styled(Link)`
  width: 30%;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
`;

const Footer = styled.footer`
  position: fixed;
  z-index: 999;
  display: flex;
  align-items: center;
`;
