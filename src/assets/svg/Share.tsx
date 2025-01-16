import * as React from 'react';
import type { SVGProps } from 'react';
const SvgShare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <path
      stroke="#5B7083"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.511}
      d="M13.767 9.499v2.686a1.343 1.343 0 0 1-1.344 1.343H3.022a1.343 1.343 0 0 1-1.343-1.343V9.499M11.08 4.798 7.723 1.44 4.365 4.798M7.723 1.44V9.5"
    />
  </svg>
);
export default SvgShare;
