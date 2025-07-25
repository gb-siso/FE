import * as React from 'react';
import type { SVGProps } from 'react';
const SvgNotificationsIcon = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 0 0 2 2m6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1z" />
    </svg>
  </svg>
);
export default SvgNotificationsIcon;
