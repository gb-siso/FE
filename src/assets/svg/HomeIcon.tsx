import * as React from 'react';
import type { SVGProps } from 'react';
const SvgHomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      fill="#1a1a1a"
      opacity="38%"
      viewBox="0 0 24 24"
      {...props}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  </svg>
);
export default SvgHomeIcon;
