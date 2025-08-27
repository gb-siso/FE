import styled from 'styled-components';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'full';
  bg?: string;
  radius?: string;
}

const Button: React.FC<ButtonProps> = ({
  size = 'xxl',
  onClick = () => {},
  bg = '#8800fb',
  type = 'button',
  radius = '24px',
  name,
  ...props
}: any) => {
  return (
    <StyledButton
      $size={size}
      $bg={bg}
      onClick={onClick}
      type={type}
      $radius={radius}
      {...props}
    >
      {name || '전송'}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<{
  $size: string;
  $bg: string;
  $radius: string;
}>`
  cursor: pointer;
  font-weight: bold;
  display: block;
  text-align: center;
  padding: 0px 5px;
  border: 0;
  box-sizing: border-box;
  border-radius: ${({ $radius }) => $radius || '24px'};
  background-color: ${({ $bg }) => $bg || '#8800fb'};
  color: #ffffff;
  outline: none;
  font-size: 18px;
  /* padding: 14px 0; */
  font-weight: 700;
  width: ${({ $size }) => {
    switch ($size) {
      case 'xs':
        return '70px';
      case 's':
        return '100px';
      case 'm':
        return '150px';
      case 'l':
        return '200px';
      case 'xl':
        return '250px';
      case 'xxl':
        return '335px';
      case 'full':
        return '100%';
    }
  }};
  height: ${({ $size }) => {
    switch ($size) {
      case 'xs':
        return '44px';
      case 's':
        return '44px';
      case 'm':
        return '44px';
      case 'l':
        return '44px';
      case 'xl':
        return '44px';
      case 'xxl':
        return '44px';
      case 'full':
        return '44px';
    }
  }};
`;
