'use client';

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

interface ProgressiveImgProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  placeholderSrc?: string; // 로딩 중 보여줄 저화질 이미지
  src: string; // 원본 이미지
  alt?: string;
}

export default function ProgressiveImg({
  placeholderSrc,
  src,
  alt,
  ...props
}: ProgressiveImgProps) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || '');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView && !hasError && imgSrc !== src) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsLoading(false);
      };
      img.onerror = () => {
        setHasError(true);
        setIsLoading(false);
      };
    }
  }, [inView, src, imgSrc, hasError]);

  return (
    <Wrapper ref={ref} isLoading={isLoading}>
      {(isLoading || hasError) && <Div />}
      {!isLoading && (
        <Img {...props} src={imgSrc} alt={alt} isLoading={isLoading} />
      )}
    </Wrapper>
  );
}

const Div = styled.div`
  display: flex;
  width: 100%;
  height: 650px;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div<{ isLoading: boolean }>`
  position: relative;
  width: 100%;

  background-color: ${({ isLoading }) => (isLoading ? 'block' : 'none')};
  &:after {
    content: '';
    display: ${({ isLoading }) => (isLoading ? 'block' : 'none')};
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

const Placeholder = styled.div`
  width: 100%;
  background-color: #eee;
`;

const Img = styled.img<{ isLoading: boolean }>`
  transition: all 0.5s ease;
  filter: ${({ isLoading }) => (isLoading ? 'blur(2px)' : 'blur(0)')};
  clip-path: inset(0);
  width: 100%;
  height: auto;
  display: block;
`;
