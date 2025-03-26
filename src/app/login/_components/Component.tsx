'use client';
import Spinner from '@/app/_components/Spinner';
import useHandler from '@/app/hooks/useHandler';
import { loginAtom, userMeAtom } from '@/modules/auth/atoms';
import { copyFileSync } from 'fs';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Component = () => {
  const router = useRouter();

  const login = useSetAtom(loginAtom);

  const handleNaverLogin = () => {
    const redirectUri = encodeURIComponent('http://localhost:3000/login');
    const state = 'STATE_STRING';

    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=Th1BehbvHJ2zuZ6YOosR&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = naverAuthUrl;
  };

  const { isLoading, handler } = useHandler(async (code, state) => {
    try {
      await login({ code, state });
      toast.success('로그인 완료😀');
      router.replace('/');
    } catch {
      router.replace('/login');
    }
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      handler(code, state);
    }
  }, []);

  if (isLoading)
    return (
      <Wrap>
        <Spinner title={'잠시만 기다려주세요 🙂'} />
      </Wrap>
    );

  return (
    <Wrap>
      <HeaderBox>
        <Header>
          <Logo onClick={() => router.push('/')}>SISO</Logo>
        </Header>
        <WelcomeText>시소에 오신 것을 환영합니다!</WelcomeText>
      </HeaderBox>
      <Bottom>
        {/* <Input placeholder={'User ID'} />
        <Input placeholder={'Password'} /> */}
        <Button
          // bg="#03C75A"
          onClick={() => {
            handleNaverLogin();
            // window.location.href =
            //   'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=Th1BehbvHJ2zuZ6YOosR&redirect_uri=http%3A%2F%2F34.64.182.4%3A8080%2Fapi%2Fv1%2Fauth%2Flogin%2Fnaver&state=STATE_STRING';
          }}
        >
          네이버 로그인
        </Button>
        {/* <Button bg="#FFCD00">카카오 로그인</Button> */}
      </Bottom>
    </Wrap>
  );
};

export default Component;

// 바텀
const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px; /* 각 버튼과 입력 필드 사이에 여백을 조금 더 여유있게 */
  width: 100%;
  max-width: 380px; /* 최대 너비를 좀 더 넓혀서 공간감을 줌 */
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  padding: 12px 20px;
  margin: 0;
  border: 1px solid #d1d1d1;
  border-radius: 30px;
  background-color: #f9f9f9;
  color: #333;
  font-size: 16px;
  font-family: 'Work Sans', sans-serif;
  line-height: 1.5;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #8800fb; /* 입력 필드에 포커스 시 색상 변경 */
  }
`;

const Button = styled.button<{ bg?: string }>`
  cursor: pointer;
  width: 100%;
  height: 50px;
  padding: 0 20px;
  border: none;
  border-radius: 30px;
  color: #fff;
  font-size: 16px;
  font-family: 'Work Sans', sans-serif;
  line-height: 1.5;
  outline: none;
  background-color: ${({ bg }) => (bg ? bg : '#7a00d6')};
  transition: background-color 0.3s ease;

  /* &:hover {
    background-color: ${({ bg }) =>
    bg === 'gray' ? '#555' : bg === 'main' ? '#7a00d6' : '#7a00d6'};
  } */

  &:focus {
    outline: 2px solid #8800fb; /* 버튼에 포커스 시 외곽선 추가 */
  }
`;

// 헤더
const Wrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 90vh;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 4rem;
  color: #8800fb;
  letter-spacing: 2px;
  cursor: pointer;
  font-family: 'Alfa Slab One', serif;
`;

const Header = styled.header`
  font-family: 'Alfa Slab One', serif;
  text-align: center;
`;

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px; /* 헤더와 환영 문구 간 간격 */
`;

const WelcomeText = styled.p`
  margin: 0;
  color: #999;
  font-size: 1.1rem;
  margin-top: -1.3rem;
  margin-bottom: 2rem;
`;
