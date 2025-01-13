'use client';

import styled, { css } from 'styled-components';

export const Flex = styled.div<{
  $flexGrow?: React.CSSProperties['flexGrow'];
  $flexShrink?: React.CSSProperties['flexShrink'];
  $flexBasis?: React.CSSProperties['flexBasis'];
  $flexDirection?: React.CSSProperties['flexDirection'];
  $gap?: React.CSSProperties['gap'];
  $justifyContent?: React.CSSProperties['justifyContent'];
  $alignItems?: React.CSSProperties['alignItems'];
  $background?: React.CSSProperties['background'];
  $width?: React.CSSProperties['width'];
  $height?: React.CSSProperties['height'];
  $maxWidth?: React.CSSProperties['maxWidth'];
  $maxHeight?: React.CSSProperties['maxHeight'];
  $minWidth?: React.CSSProperties['minWidth'];
  $minHeight?: React.CSSProperties['minHeight'];
}>`
  display: flex;
  flex: ${({ $flexGrow = 0, $flexShrink = 0, $flexBasis = 'auto' }) =>
    `${$flexGrow} ${$flexShrink} ${$flexBasis}`};

  ${({ $flexDirection }) =>
    $flexDirection &&
    css`
      flex-direction: ${$flexDirection};
    `}
  ${({ $gap }) =>
    $gap &&
    css`
      gap: ${$gap};
    `}
  ${({ $justifyContent }) =>
    $justifyContent &&
    css`
      justify-content: ${$justifyContent};
    `}
  ${({ $alignItems }) =>
    $alignItems &&
    css`
      align-items: ${$alignItems};
    `}
  ${({ $background }) =>
    $background &&
    css`
      background: ${$background};
    `}
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
  ${({ $height }) =>
    $height &&
    css`
      height: ${$height};
    `}
  ${({ $maxWidth }) =>
    $maxWidth &&
    css`
      max-width: ${$maxWidth};
    `}
  ${({ $maxHeight }) =>
    $maxHeight &&
    css`
      max-height: ${$maxHeight};
    `}
  ${({ $minWidth }) =>
    $minWidth &&
    css`
      min-width: ${$minWidth};
    `}
  ${({ $minHeight }) =>
    $minHeight &&
    css`
      min-height: ${$minHeight};
    `}
`;
