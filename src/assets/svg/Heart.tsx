import * as React from 'react';
import type { SVGProps } from 'react';
const SvgHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={17}
    fill="none"
    {...props}
  >
    <path
      fill="#7C3AED"
      stroke="#7C3AED"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.511}
      d="M16.155 2.687a4.255 4.255 0 0 0-6.018 0l-.82.82-.82-.82A4.255 4.255 0 0 0 2.48 8.705l.82.82 6.018 6.017 6.017-6.017.82-.82a4.255 4.255 0 0 0 0-6.018"
    />
  </svg>
);
export default SvgHeart;
