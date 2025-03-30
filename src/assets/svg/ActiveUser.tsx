import * as React from 'react';
import type { SVGProps } from 'react';
const SvgActiveUser = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={512}
    height={512}
    data-name="Layer 1"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M16.043 14H7.957A4.963 4.963 0 0 0 3 18.957V24h18v-5.043A4.963 4.963 0 0 0 16.043 14" />
    <circle cx={12} cy={6} r={6} />
  </svg>
);
export default SvgActiveUser;
