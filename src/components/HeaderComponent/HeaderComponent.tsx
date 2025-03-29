'use client';
import { COMMUNITY, HOME, Notifications } from '@/utils/route';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import Button from '../Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const HeaderComponent = () => {
  const path = usePathname();
  const router = useRouter();

  const isActive = (url: string) => {
    return path.includes(url);
  };
  const isHome = (url: string) => {
    return url !== path;
  };
  if (path === '/login' || path === '/search') return <></>;
  return (
    <>
      <Header>
        <Logo onClick={() => router.push('/')}>SISO</Logo>
      </Header>
      <Nav>
        <MenuLink href={HOME} actived={isHome(COMMUNITY)}>
          <RatingTab>SISO 별점</RatingTab>
        </MenuLink>
        <MenuLink href={COMMUNITY} actived={isActive(COMMUNITY)}>
          <CommunityTab>커뮤니티</CommunityTab>
        </MenuLink>
      </Nav>
    </>
  );
};

export default HeaderComponent;

const Header = styled.header`
  top: 0px;
  left: 0px;
  width: 100%;
  max-width: 600px;
  height: 60px;
  background-color: #fafafa;
  box-shadow: 2px 1px 4px rgba(3, 3, 3, 0.2);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-family: 'Alfa Slab One', serif;
  display: flex;
  justify-content: center;
  align-self: center;
  position: relative;
  z-index: 1;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 28px;
  letter-spacing: 1.5px;
  cursor: pointer;
  padding: 0 2rem;
`;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  background-color: #fff;
`;

const RatingTab = styled.div``;
const CommunityTab = styled.div``;

const MenuLink = styled(Link)<{ actived?: boolean }>`
  padding: 1.2rem 1.2rem;
  padding-bottom: 0.2rem;
  font-size: 14px;
  font-weight: ${({ actived }) => (actived ? 'bold' : '600')};
  color: ${({ actived }) => (actived ? '#8800FB' : '#777')};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: ${({ actived }) =>
      actived ? 'calc(100% + 0.33rem - 1px)' : 'calc(100% + 0.33rem)'};
    left: 0px;
    width: 100%;
    height: 3px;
    border-radius: 5px 5px 0 0;
    background-color: ${({ actived }) => (actived ? '#8800FB' : 'none')};
    transition: all 0.1s ease-in-out; /* 트랜지션 추가 */
  }

  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
`;
