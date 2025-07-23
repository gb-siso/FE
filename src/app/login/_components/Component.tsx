'use client';
import Spinner from '@/app/_components/Spinner';
import useHandler from '@/app/hooks/useHandler';
import { loginAtom, userMeAtom } from '@/modules/auth/atoms';
import { copyFileSync, stat } from 'fs';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const Component = () => {
  const router = useRouter();
  const [isAgreed, setIsAgreed] = useState(false);

  const login = useSetAtom(loginAtom);

  const handleNaverLogin = () => {
    if (!isAgreed) {
      toast.error('이용약관에 동의해주세요.');
      return;
    }

    const redirectUri = encodeURIComponent('http://localhost:8080/login');
    const state = 'STATE_STRING';

    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=Th1BehbvHJ2zuZ6YOosR&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = naverAuthUrl;
  };

  const { isLoading, handler } = useHandler(
    async (code: string, state: string) => {
      try {
        await login({ code, state });
        toast.success('로그인 완료😀');
        router.replace('/');
      } catch {
        router.replace('/login');
      }
    }
  );

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
        <AgreementBox>
          <Checkbox
            type="checkbox"
            id="agreement"
            checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}
          />
          <AgreementLabel htmlFor="agreement">
            <AgreementText>
              <AgreementLink
                href="https://lab3tech.notion.site/bb615ec093fe42c4addc4c123c48d409"
                target="_blank"
              >
                이용약관
              </AgreementLink>
              및
              <AgreementLink
                href="https://lab3tech.notion.site/70238bedf3664ff4b7e623e03e46ab6f"
                target="_blank"
              >
                개인정보처리방침에
              </AgreementLink>
              동의합니다.
            </AgreementText>
          </AgreementLabel>
        </AgreementBox>
        <ButtonWrap onClick={handleNaverLogin} $disabled={!isAgreed}>
          <Box size={30}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 19 19"
              fill="none"
              width="19"
              height="19"
            >
              <path
                d="M12.8833 10.1682L5.83879 0H0V19H6.11667V8.83025L13.1612 19H19V0H12.8833V10.1682Z"
                fill="#03C75A"
              ></path>
            </svg>
          </Box>
          <Box style={{ paddingRight: '10px' }}>네이버 로그인</Box>
        </ButtonWrap>
        {/* <Input placeholder={'User ID'} />
        <Input placeholder={'Password'} /> */}
        {/* <Button
          onClick={() => {
            handleNaverLogin();
            // window.location.href =
            //   'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=Th1BehbvHJ2zuZ6YOosR&redirect_uri=http%3A%2F%2F34.64.182.4%3A8080%2Fapi%2Fv1%2Fauth%2Flogin%2Fnaver&state=STATE_STRING';
          }}
        >
          네이버 로그인
        </Button> */}
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

const ButtonWrap = styled.div<{ $disabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0.75rem 1.125rem;
  border-radius: 0.25rem;
  border-radius: 8px;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ $disabled }) => ($disabled ? '#e0f0e5' : '#03C75A')};
  transition: all 0.3s;

  /* 텍스트 색상도 조정 */
  color: ${({ $disabled }) => ($disabled ? '#8d8d8d' : 'white')};

  /* SVG 아이콘 색상 조정 */
  svg path {
    fill: ${({ $disabled }) => ($disabled ? '#a0a0a0' : 'white')};
  }
`;
// const ButtonWrap = styled.div<{ $disabled?: boolean }>`
//   /* display: flex;
//   align-items: center;
//   width: 100%;
//   cursor: pointer; */
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   box-sizing: border-box;
//   width: 100%;
//   padding: 0.75rem 1.125rem;
//   border-radius: 0.25rem;

//   border-radius: 8px;
//   cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
//   background-color: ${({ $disabled }) => ($disabled ? '#ccc' : '#f9fafc')};
//   transition: all 0.3s;
// `;

// const NaverButton = styled.button`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   all: unset;
//   gap: 10px;
//   width: 100%;
//   height: 100%;
//   > svg {
//     border: 1px solid blue;
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//   }

//   all: unset;
//   height: 100%;
//   text-align: center;
//   font-size: 16px;
//   display: block;
//   width: 100%;
//   height: 100%;
//   text-align: center;
//   font-size: 16px;
//   font-weight: 00;
//   color: #fff;
//   background-color: ${({ disabled }) => (disabled ? '#ccc' : '#03c75a')};
//   padding: 10px 20px;
//   border-radius: 5px;
//   cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
//   transition: background-color 0.3s ease;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid blue;
// `;

const AgreementBox = styled.div`
  display: flex;
  align-items: center; // 수직 정렬
  justify-content: center; // 수평 정렬
  gap: 8px;
  width: 100%;
  margin-bottom: 10px;
`;

const Checkbox = styled.input`
  margin: 0;
  margin-top: 2px;
  cursor: pointer;
  accent-color: #8800fb;
`;

const AgreementLabel = styled.label`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
`;

const AgreementText = styled.span`
  display: flex;
  gap: 4px;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
`;

const AgreementLink = styled.a`
  color: #8800fb;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Box = styled.div<{ size?: number }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: ${({ size }) => `${size ? `${size}px` : '100%'}`};
  height: ${({ size }) => `${size ? `${size}px` : '100%'}`};
  font-weight: 600;
  font-size: 1rem;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
