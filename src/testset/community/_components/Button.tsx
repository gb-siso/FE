'use client';

import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

import {
  BREAK_POINT,
  PRIMARY,
  black,
  black_2,
  grey_7
} from '@/utils/ui/constant';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'primary' | 'secondary' | 'tertiary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  buttonType = 'primary',
  ...props
}) => {
  if (buttonType === 'primary')
    return (
      <PrimaryButton disabled={props?.disabled} {...props}>
        {children}
      </PrimaryButton>
    );
  if (buttonType === 'secondary')
    return <SecondaryButton {...props}>{children}</SecondaryButton>;
  if (buttonType === 'tertiary')
    return <TertiaryButton {...props}>{children}</TertiaryButton>;
  return <button></button>;
};

const SecondaryButton = styled.button`
  padding: 9px 12px;
  border-radius: 4px;
  color: ${black};
  font-weight: 500;
  font-size: 14px;
  line-height: 1rem;

  &:focus {
    box-shadow: 0 0 5px rgb(0 123 255 / 50%); /* 포커스 시 그림자 효과 추가 */
    outline: none; /* 포커스 시 아웃라인 제거 */
  }

  @media (width < ${BREAK_POINT.MOBILE}) {
    padding: 5px 10px;
    border-radius: 4px;
  }
`;
const PrimaryButton = styled.button`
  padding: 9px 14px;
  border-radius: 4px;
  background-color: ${(props) => (props.disabled ? `#E5E5E5` : `${PRIMARY}`)};
  color: ${(props) => (props.disabled ? `#B0B0B0` : `#fff`)};
  font-weight: 500;
  font-size: 15px;
  line-height: 1rem;
`;

const TertiaryButton = styled.button`
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 9px 12px;
  border: 1px solid ${grey_7};
  border-radius: 4px;
  color: ${black_2};
  font-weight: 500;
  font-size: 14px;
  line-height: 1rem;
  letter-spacing: -0.14px;
  transition: all 0.3s;

  &:focus {
    outline: none; /* 포커스 시 아웃라인 제거 */
  }

  &:hover {
    border-color: ${PRIMARY};
    color: ${PRIMARY};
  }

  @media (width < ${BREAK_POINT.MOBILE}) {
    padding: 5px 10px;
  }
`;
