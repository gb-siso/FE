'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';
import { HOME, Notifications } from '@/utils/route';
import {
  ActiveHomeIcon,
  HomeIcon,
  ActiveNotificationsIcon,
  NotificationsIcon
} from '@/assets/svg';
import { atom, useAtom } from 'jotai';
import { isLoadingAtom } from '@/atoms/atom';
import './styles.css';
import Image from 'next/image';

export default function FooterNavigation() {
  const path = usePathname();
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
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
      <footer className="footer-nav">
        <StyledLink href={HOME}>
          <span>
            {path === Notifications ? <HomeIcon /> : <ActiveHomeIcon />}
          </span>
        </StyledLink>
        <StyledLink href={Notifications}>
          <span>
            {path === Notifications ? (
              <ActiveNotificationsIcon />
            ) : (
              <NotificationsIcon />
            )}
          </span>
        </StyledLink>
      </footer>
    </>
  );
}

const StyledLink = styled(Link)`
  width: 30%;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
`;
