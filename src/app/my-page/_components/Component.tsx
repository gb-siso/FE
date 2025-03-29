'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { toast } from 'react-toastify';
import { logoutAtom } from '@/modules/auth/atoms';

const LogoutPage = () => {
  const router = useRouter();
  const logout = useSetAtom(logoutAtom);
  const user =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('userData') || '{}')
      : null;

  const isLogin =
    typeof window !== 'undefined' &&
    localStorage.getItem('cookieData') !== 'null';

  const handleLogout = async () => {
    try {
      await logout();
      toast.error('로그아웃 되었습니다.');
      router.replace('/');
    } catch (error) {
      toast.error('로그아웃 중 문제가 발생했습니다.');
    }
  };

  if (!isLogin || !user?.nickname) {
    router.replace('/login');
    return;
  }

  return (
    <Container>
      <ContentWrapper>
        <UserInfo>
          {user?.nickname ? `${user.nickname}님` : '게스트님'}
          <WelcomeText>정상적으로 로그아웃됩니다</WelcomeText>
        </UserInfo>

        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </ContentWrapper>
    </Container>
  );
};

export default LogoutPage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
`;

const ContentWrapper = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const UserInfo = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 2rem;
`;

const WelcomeText = styled.p`
  color: #666;
  font-size: 1rem;
  margin-top: 1rem;
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #7a00d6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5a00a3;
  }

  &:active {
    transform: scale(0.98);
  }
`;
