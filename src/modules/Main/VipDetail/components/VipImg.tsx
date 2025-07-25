import React, { useState } from 'react';
import styled from 'styled-components';

const VipImg = ({ src }: { src: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <Wrapper $loaded={loaded} $error={error}>
      {!error && (
        <img
          src={src}
          alt="VIP"
          style={{
            display: loaded ? 'block' : 'none',
            width: '100%',
            height: 'auto',
            objectFit: 'cover'
          }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </Wrapper>
  );
};

export default VipImg;

const Wrapper = styled.div<{ $loaded: boolean; $error: boolean }>`
  width: 100%;
  aspect-ratio: 1/1.2;
  /* height: ${({ $loaded }) => ($loaded ? '100%' : 'calc(600px * 1)')};
  max-height: min(600px, 100%); */
  overflow: hidden;
  background-color: ${({ $loaded, $error }) =>
    $loaded && !$error ? 'transparent' : '#ccc'};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: '';
    display: ${({ $loaded }) => ($loaded ? 'none' : 'block')};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: translateX(-100px);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255),
      transparent
    );
    animation: loading 0.8s infinite;
    pointer-events: none;

    @keyframes loading {
      100% {
        transform: translateX(100%);
      }
    }
  }
`;
