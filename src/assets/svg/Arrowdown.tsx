import * as React from 'react';
import type { SVGProps } from 'react';
const SvgArrowdown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={7}
    height={6}
    fill="none"
    {...props}
  >
    <path
      fill="#5E5E5E"
      d="M6.626.763 3.46 5.429c-.067.1-.2.1-.267 0L.026.763C-.04.663.026.496.16.496h6.333c.133 0 .2.167.133.267"
    />
  </svg>
);
export default SvgArrowdown;
